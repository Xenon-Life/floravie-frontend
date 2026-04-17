export const quizzes = [
  {
    id: "pcos-basics",
    title: "PCOS Basics",
    description: "Quick check-in on common PCOS signs and next steps.",
    tags: ["Hormones", "Cycle", "Wellness"],
    /**
     * Deterministic result builder:
     * - No AI, no randomness
     * - Output is derived ONLY from selected options + flags
     */
    getResult: ({ score, answers, quiz }) => {
      const selected = (questionId) => {
        const optId = answers?.[questionId];
        const q = quiz.questions.find((x) => x.id === questionId);
        const opt = q?.options?.find((o) => o.id === optId);
        return opt || null;
      };

      const cycle = selected("q1");
      const androgen = selected("q2");
      const weight = selected("q3");

      const flags = {
        irregularCycles: cycle?.meta?.cycle === "often_irregular",
        someIrregularity: cycle?.meta?.cycle === "sometimes_irregular",
        androgenSigns: androgen?.meta?.androgen === true,
        higherAndrogenSigns: androgen?.meta?.androgenLevel === "high",
        weightChange: weight?.meta?.weight === true,
        significantWeightChange: weight?.meta?.weightLevel === "high",
      };

      // Deterministic band (based on score but used only to choose solution intensity)
      let band = "low";
      if (score >= 5) band = "high";
      else if (score >= 2) band = "moderate";

      const titleByBand = {
        low: "Low signal pattern (based on your selections)",
        moderate: "Moderate signal pattern",
        high: "Higher signal pattern",
      };

      const summary = [cycle?.insight, androgen?.insight, weight?.insight].filter(
        Boolean
      );

      const predictions = [];
      if (flags.irregularCycles) {
        predictions.push(
          "Cycle pattern suggests frequent irregular or missed periods."
        );
      } else if (flags.someIrregularity) {
        predictions.push("Cycle pattern suggests occasional irregularity.");
      }
      if (flags.higherAndrogenSigns) {
        predictions.push("Symptoms suggest stronger androgen-related changes.");
      } else if (flags.androgenSigns) {
        predictions.push("Symptoms suggest some androgen-related changes.");
      }
      if (flags.significantWeightChange) {
        predictions.push("Weight change signal is significant in your selections.");
      } else if (flags.weightChange) {
        predictions.push("Weight change/difficulty signal is present.");
      }

      const nextSteps = [];
      nextSteps.push(
        "Track cycle length (start-to-start) for 2–3 months and note missed/late periods."
      );
      nextSteps.push(
        "Track skin/hair changes weekly (acne, hair growth, scalp hair thinning) and any triggers."
      );
      nextSteps.push(
        "Build a steady routine: consistent sleep, daily movement, and balanced meals with protein + fiber."
      );

      if (band === "low") {
        nextSteps.push(
          "If your goal is prevention: keep tracking and adjust routines based on what improves symptoms."
        );
      } else if (band === "moderate") {
        nextSteps.push(
          "If cycles are irregular, focus on routine consistency (sleep + stress + movement) and monitor changes over the next 4–8 weeks."
        );
        nextSteps.push(
          "If acne/hair symptoms are bothersome, consider a simple skincare routine and track what worsens it (diet, stress, cycle)."
        );
      } else {
        nextSteps.push(
          "If periods are often missing or very irregular, prioritize a tracking plan + routine consistency to stabilize patterns."
        );
        nextSteps.push(
          "If weight changes are significant, use a weekly plan: meal prep basics, step goal, and strength training 2–3x/week (as tolerated)."
        );
      }

      return {
        title: titleByBand[band],
        band,
        score,
        summary,
        predictions,
        nextSteps,
      };
    },
    questions: [
      {
        id: "q1",
        text: "In the last 6 months, how regular are your periods?",
        options: [
          {
            id: "a",
            label: "Regular (21–35 days)",
            score: 0,
            meta: { cycle: "regular" },
            insight: "Cycle pattern: usually regular (21–35 days).",
          },
          {
            id: "b",
            label: "Sometimes irregular",
            score: 1,
            meta: { cycle: "sometimes_irregular" },
            insight: "Cycle pattern: sometimes irregular.",
          },
          {
            id: "c",
            label: "Often irregular / missing",
            score: 2,
            meta: { cycle: "often_irregular" },
            insight: "Cycle pattern: often irregular or missed periods.",
          },
        ],
      },
      {
        id: "q2",
        text: "Have you noticed increased facial/body hair or acne recently?",
        options: [
          {
            id: "a",
            label: "No",
            score: 0,
            meta: { androgen: false },
            insight: "Androgen-related symptoms: none reported (hair/acne).",
          },
          {
            id: "b",
            label: "A little",
            score: 1,
            meta: { androgen: true, androgenLevel: "low" },
            insight: "Androgen-related symptoms: mild hair/acne changes.",
          },
          {
            id: "c",
            label: "Yes, significant",
            score: 2,
            meta: { androgen: true, androgenLevel: "high" },
            insight: "Androgen-related symptoms: significant hair/acne changes.",
          },
        ],
      },
      {
        id: "q3",
        text: "How would you describe your weight changes (if any)?",
        options: [
          {
            id: "a",
            label: "No major change",
            score: 0,
            meta: { weight: false },
            insight: "Weight change signal: no major change reported.",
          },
          {
            id: "b",
            label: "Some gain or difficulty losing",
            score: 1,
            meta: { weight: true, weightLevel: "low" },
            insight: "Weight change signal: some gain or difficulty losing.",
          },
          {
            id: "c",
            label: "Significant gain / rapid change",
            score: 2,
            meta: { weight: true, weightLevel: "high" },
            insight: "Weight change signal: significant or rapid change.",
          },
        ],
      },
    ],
    results: [
      {
        minScore: 0,
        maxScore: 1,
        title: "Low likelihood (based on this short quiz)",
        message:
          "This quiz is not a diagnosis. If you have symptoms or concerns, consider tracking your cycle and speaking with a clinician.",
      },
      {
        minScore: 2,
        maxScore: 4,
        title: "Moderate likelihood",
        message:
          "Consider discussing symptoms with a clinician. Tracking cycle patterns, acne/hair changes, and energy levels can help.",
      },
      {
        minScore: 5,
        maxScore: 6,
        title: "Higher likelihood",
        message:
          "Consider scheduling a clinical evaluation. Ask about hormonal labs and ultrasound where appropriate. Continue symptom + cycle tracking.",
      },
    ],
  },
  {
    id: "period-pain",
    title: "Period Pain Check",
    description: "Understand severity and when to seek care.",
    tags: ["Pain", "Periods"],
    /**
     * Deterministic result builder:
     * - No AI, no randomness
     * - Output is derived ONLY from selected options + score band
     */
    getResult: ({ score, answers, quiz }) => {
      const selected = (questionId) => {
        const optId = answers?.[questionId];
        const q = quiz.questions.find((x) => x.id === questionId);
        const opt = q?.options?.find((o) => o.id === optId);
        return opt || null;
      };

      const pain = selected("q1");
      const meds = selected("q2");
      const outside = selected("q3");

      const flags = {
        disruptsLife: pain?.meta?.impact === "high",
        poorResponseToMeds: meds?.meta?.response === "poor",
        painOutsidePeriod: outside?.meta?.outside === true,
      };

      let band = "low";
      if (score >= 5) band = "high";
      else if (score >= 2) band = "moderate";

      const titleByBand = {
        low: "Likely mild pattern",
        moderate: "Moderate impact pattern",
        high: "High impact pattern",
      };

      const summary = [
        pain?.insight,
        meds?.insight,
        outside?.insight,
      ].filter(Boolean);

      const predictions = [];
      if (flags.disruptsLife) {
        predictions.push(
          "Your answers suggest pain is significantly impacting daily activities."
        );
      }
      if (flags.poorResponseToMeds) {
        predictions.push(
          "Your answers suggest over-the-counter pain relief is not reliably working."
        );
      }
      if (flags.painOutsidePeriod) {
        predictions.push(
          "Your answers suggest pelvic pain can occur outside bleeding days."
        );
      }

      const nextSteps = [];
      if (band === "low") {
        nextSteps.push(
          "Track pain score (0–10), day of cycle, and what helped (heat, rest, medication)."
        );
        nextSteps.push(
          "Use a heat pad 15–20 minutes, 2–3 times/day on painful days."
        );
        nextSteps.push(
          "Try gentle movement (10–20 min walk or stretching) if it feels comfortable."
        );
      } else if (band === "moderate") {
        nextSteps.push(
          "Track pain timing + flow + associated symptoms for 2–3 cycles (nausea, bowel pain, fatigue)."
        );
        nextSteps.push(
          "Start pain relief early (at first signs of cramps) and continue on schedule for the first 24–48 hours, if safe for you."
        );
        nextSteps.push(
          "If OTC NSAIDs are safe for you, take with food and water; avoid mixing multiple NSAIDs."
        );
        nextSteps.push(
          "Add supportive care: hydration, sleep, warm fluids, and a light meal to reduce nausea."
        );
      } else {
        nextSteps.push(
          "If pain is severe, prioritize rest + heat, and use your safest effective pain-relief plan."
        );
        nextSteps.push(
          "If OTC meds barely help, try taking them earlier (before pain peaks) and track what dose/timing worked best (within safe limits)."
        );
        nextSteps.push(
          "Use a simple plan for the worst days: heat + hydration + gentle movement if tolerated + meals + sleep."
        );
        nextSteps.push(
          "Get urgent help if you have severe sudden pain, fainting, fever, vomiting you can’t keep fluids down, or very heavy bleeding (soaking 1 pad/hour for 2+ hours)."
        );
      }

      return {
        title: titleByBand[band],
        band,
        score,
        summary,
        predictions,
        nextSteps,
      };
    },
    questions: [
      {
        id: "q1",
        text: "How strong is your period pain on most cycles?",
        options: [
          {
            id: "a",
            label: "Mild (manageable)",
            score: 0,
            meta: { impact: "low" },
            insight: "Pain intensity: mild on most cycles.",
          },
          {
            id: "b",
            label: "Moderate (affects activities)",
            score: 1,
            meta: { impact: "medium" },
            insight: "Pain intensity: moderate and affects activities.",
          },
          {
            id: "c",
            label: "Severe (miss work/school)",
            score: 2,
            meta: { impact: "high" },
            insight: "Pain intensity: severe and disrupts daily life.",
          },
        ],
      },
      {
        id: "q2",
        text: "Do painkillers (e.g., ibuprofen/naproxen) usually help?",
        options: [
          {
            id: "a",
            label: "Yes",
            score: 0,
            meta: { response: "good" },
            insight: "Pain relief response: usually improves with OTC painkillers.",
          },
          {
            id: "b",
            label: "Sometimes",
            score: 1,
            meta: { response: "mixed" },
            insight: "Pain relief response: sometimes improves with OTC painkillers.",
          },
          {
            id: "c",
            label: "No / barely",
            score: 2,
            meta: { response: "poor" },
            insight: "Pain relief response: poor despite OTC painkillers.",
          },
        ],
      },
      {
        id: "q3",
        text: "Do you have pain outside your period (pelvic pain mid-cycle or daily)?",
        options: [
          {
            id: "a",
            label: "No",
            score: 0,
            meta: { outside: false },
            insight: "Pain timing: mostly limited to bleeding days.",
          },
          {
            id: "b",
            label: "Occasionally",
            score: 1,
            meta: { outside: true },
            insight: "Pain timing: can occur outside bleeding days sometimes.",
          },
          {
            id: "c",
            label: "Often",
            score: 2,
            meta: { outside: true },
            insight: "Pain timing: often occurs outside bleeding days.",
          },
        ],
      },
    ],
    results: [
      {
        minScore: 0,
        maxScore: 1,
        title: "Likely mild dysmenorrhea",
        message:
          "If symptoms are manageable, consider hydration, heat therapy, gentle movement, and tracking triggers. Seek care if symptoms worsen.",
      },
      {
        minScore: 2,
        maxScore: 4,
        title: "Moderate impact",
        message:
          "Your selections indicate a moderate impact pattern. The steps below are tailored to what you selected (pain level, medicine response, and timing).",
      },
      {
        minScore: 5,
        maxScore: 6,
        title: "High impact",
        message:
          "Your selections indicate a high impact pattern. Focus on relief strategies + clear tracking to learn what reliably helps, and use the urgent-warning list if symptoms escalate.",
      },
    ],
  },
];


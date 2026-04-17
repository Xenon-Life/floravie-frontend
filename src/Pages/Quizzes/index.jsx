import { useMemo, useState } from "react";
import { Button, Card, Progress, Tag } from "antd";
import { quizzes } from "../../data/quizzes";

const getResultForScore = (quiz, score) => {
  const match = quiz.results.find(
    (r) => score >= r.minScore && score <= r.maxScore
  );
  return (
    match || {
      title: "Result",
      message: "Thanks for taking the quiz.",
    }
  );
};

const getDeterministicResult = ({ quiz, score, answers }) => {
  if (typeof quiz.getResult === "function") {
    return quiz.getResult({ quiz, score, answers });
  }
  return getResultForScore(quiz, score);
};

function Quizzes() {
  const [activeQuizId, setActiveQuizId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [stepIndex, setStepIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const activeQuiz = useMemo(
    () => quizzes.find((q) => q.id === activeQuizId) || null,
    [activeQuizId]
  );

  const currentQuestion = activeQuiz?.questions?.[stepIndex] || null;

  const totalQuestions = activeQuiz?.questions?.length || 0;
  const progressPercent =
    totalQuestions > 0 ? Math.round((stepIndex / totalQuestions) * 100) : 0;

  const score = useMemo(() => {
    if (!activeQuiz) return 0;
    return activeQuiz.questions.reduce((sum, q) => {
      const selectedOptionId = answers[q.id];
      const opt = q.options.find((o) => o.id === selectedOptionId);
      return sum + (opt?.score || 0);
    }, 0);
  }, [activeQuiz, answers]);

  const startQuiz = (id) => {
    setActiveQuizId(id);
    setAnswers({});
    setStepIndex(0);
    setShowResult(false);
  };

  const exitQuiz = () => {
    setActiveQuizId(null);
    setAnswers({});
    setStepIndex(0);
    setShowResult(false);
  };

  const selectAnswer = (questionId, optionId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const next = () => {
    if (!activeQuiz) return;
    const isLast = stepIndex >= activeQuiz.questions.length - 1;
    if (isLast) {
      setShowResult(true);
      return;
    }
    setStepIndex((s) => s + 1);
  };

  const back = () => {
    setShowResult(false);
    setStepIndex((s) => Math.max(0, s - 1));
  };

  if (!activeQuiz) {
    return (
      <div className="w-full p-4">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-semibold">Healthcare Quizzes</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          {quizzes.map((q) => (
            <Card
              key={q.id}
              title={<span className="font-semibold">{q.title}</span>}
              className="rounded-xl"
            >
              <p className="mb-3">{q.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {(q.tags || []).map((t) => (
                  <Tag key={t} color="purple">
                    {t}
                  </Tag>
                ))}
              </div>
              <Button
                type="primary"
                style={{ background: "#8E5BA6" }}
                onClick={() => startQuiz(q.id)}
              >
                Start quiz
              </Button>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const result = showResult
    ? getDeterministicResult({ quiz: activeQuiz, score, answers })
    : null;
  const selected = currentQuestion ? answers[currentQuestion.id] : null;

  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">{activeQuiz.title}</h1>
          <p className="text-sm opacity-80">{activeQuiz.description}</p>
        </div>
        <Button onClick={exitQuiz}>Exit</Button>
      </div>

      {!showResult ? (
        <Card className="rounded-xl">
          <div className="mb-4">
            <Progress percent={progressPercent} showInfo />
            <div className="text-sm opacity-70 mt-1">
              Question {stepIndex + 1} of {totalQuestions}
            </div>
          </div>

          <div className="mb-4">
            <div className="text-lg font-semibold mb-3">
              {currentQuestion?.text}
            </div>

            <div className="flex flex-col gap-2">
              {currentQuestion?.options?.map((opt) => {
                const isSelected = selected === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => selectAnswer(currentQuestion.id, opt.id)}
                    className={`text-left rounded-xl px-4 py-3 border transition ${
                      isSelected
                        ? "border-[#8E5BA6] bg-[#F7EFFB]"
                        : "border-gray-200 hover:border-[#8E5BA6]"
                    }`}
                  >
                    <div className="font-medium">{opt.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between">
            <Button onClick={back} disabled={stepIndex === 0}>
              Back
            </Button>
            <Button
              type="primary"
              style={{ background: "#8E5BA6" }}
              onClick={next}
              disabled={!selected}
            >
              {stepIndex >= totalQuestions - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="rounded-xl">
          <h2 className="text-lg font-semibold mb-2">{result.title}</h2>
          {"message" in result && result.message ? (
            <p className="mb-4">{result.message}</p>
          ) : null}

          {Array.isArray(result?.summary) && result.summary.length > 0 ? (
            <div className="mb-4">
              <div className="font-semibold mb-2">Based on your selections</div>
              <ul className="list-disc pl-5">
                {result.summary.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {Array.isArray(result?.predictions) && result.predictions.length > 0 ? (
            <div className="mb-4">
              <div className="font-semibold mb-2">What this suggests</div>
              <ul className="list-disc pl-5">
                {result.predictions.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {Array.isArray(result?.nextSteps) && result.nextSteps.length > 0 ? (
            <div className="mb-4">
              <div className="font-semibold mb-2">Next steps</div>
              <ul className="list-disc pl-5">
                {result.nextSteps.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="flex gap-2">
            <Button onClick={exitQuiz}>Back to quizzes</Button>
            <Button
              type="primary"
              style={{ background: "#8E5BA6" }}
              onClick={() => startQuiz(activeQuiz.id)}
            >
              Retake
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}

export default Quizzes;


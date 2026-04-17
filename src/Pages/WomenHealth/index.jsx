/*eslint no-irregular-whitespace: ["error", { "skipComments": true }]*/

import Footer from "../../Components/Footer";
import NavBar from "../../Components/NavBar";
import WaitingCard from "../../Components/WaitingCard";
import womenHealthBanner from "../../assets/womenHealthBanner.svg";
import womenHealthOne from "../../assets/womenHealthOne.svg";
import womenHealthTwo from "../../assets/womenHealthTwo.svg";
import womenHealthThree from "../../assets/womenHealthThree.svg";
import { GoSearch } from "react-icons/go";

function WomenHealth() {
  const problems = [
    "Adrenal Health",
    "Bone Health",
    "Thyroid Health",
    "Menopause",
    "Blood Sugar",
    "Breast Health",
    "Depression, Anxiety and mood",
    "Detoxification",
    "Digestive Health",
    "Fatigue and Insomnia",
    "Fertility",
    "Heart Health",
    "Hormonal Imbalance",
    "HRT",
    "Hysterectomy",
    "Immune Health",
    "Joint Health",
    "Nutrition",
    "PMS and mensturation",
    "Sexual Health",
    "Skin and beauty",
    "Weightloss",
    "Other women's health",
  ];
  return (
    <>
      <div className="hero-section-color mb-20 md:mb-6">
        <NavBar />
        <div className="w-11/12 m-auto flex items-center justify-center">
          <div className="w-6/12 mb-12 flex flex-col md:w-full">
            <p className="mb-3 red-text md:text-center">Welcome to Floravie</p>
            <h2 className="text-6xl font-bold leading-snug z-10 md:text-3xl md:text-center">
              Explore Women&#39;s Health
            </h2>
          </div>
          <div className="w-6/12 md:hidden">
            <img
              src={womenHealthBanner}
              className="w-full object-cover"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="w-11/12 m-auto flex justify-between mb-16 ">
        <div className="w-3/12 hero-section-color flex flex-col justify-start items-center py-10 h-full rounded-2xl md:hidden">
          <div className="flex justify-center items-center focus:outline-none mb-6 md:4">
            <input
              type="text"
              className="w-full focus:outline-none bg-transparent py-2 border-b-2 border-gray-300"
              placeholder="Search by condition"
            />
            <GoSearch size={24} color="#56595A" />
          </div>
          <div className="font-medium text-lg px-14 text-left">
            {problems.map((problem, index) => (
              <p className="mb-5" key={index}>{problem}</p>
            ))}
          </div>
        </div>
        <div className="w-8/12 md:w-full">
          <p className="text-3xl font-medium md:text-xl mb-4">
            What’s wrong with women’s health?
          </p>
          <p className="text-base md:text-sm mb-4 primary-color">
            Reviewed by Dr. Sarika Arora, MD
          </p>
          <p className="text-base md:text-sm mb-4 font-normal">
            In many ways, we live in the best of times. For those of us in
            advanced countries, women have rights and a standard of living that
            our ancestors could hardly have imagined. Let’s be mindful of that
            and grateful to live in the here and now. We also have to face the
            fact that this is a challenging time for women’s health. Life
            expectancy is high, but rates of most diseases have increased,
            especially for women — and it’s not just because we’re living
            longer.
          </p>
          <img
            src={womenHealthOne}
            alt="tempImg1"
            className="flex w-full mb-4"
          />
          <p className="text-base md:text-sm mb-4 font-normal">
            Fifty years ago, a girl had a 1 in 15 chance of developing breast
            cancer in her lifetime. Today those odds are 1 in 8 – quite
            alarming! There has also been a significant increase in the whole
            spectrum of hormonal disorders, including diabetes, thyroid disease,
            and Alzheimer’s. Rates of autoimmune and degenerative disease have
            also skyrocketed. In most of these cases, women are affected more
            than men.
          </p>
          <p className="text-base md:text-sm mb-4 font-normal">
            Today these illnesses appear in increasingly younger patients, and
            in more severe forms. Patients also present more frequently with
            “mystery diseases.” Their suffering is real, but their doctors
            question whether the disease is real– or just in their minds.
          </p>
          <div className="flex flex-col">
            <p className="font-bold text-lg mb:5 md:mb-3">Table of Contents</p>
            <li className="list-disc color-primary mb-3 md:mb-1">
              <a
                className="primary-color font-normal text-base underline md:mb-1"
                href="https://www.womenshealthnetwork.com/conditions/#conventional"
              >
                Chronic disease, conventional medicine, and women’s health
              </a>
            </li>
            <li className="list-disc color-primary mb-3 md:mb-1">
              <a
                className="primary-color font-normal text-base underline md:mb-1"
                href="https://www.womenshealthnetwork.com/conditions/#frustrates"
              >
                A system that frustrates women and doctors alike
              </a>
            </li>
            <li className="list-disc color-primary mb-3 md:mb-1">
              <a
                className="primary-color font-normal text-base underline md:mb-1"
                href="https://www.womenshealthnetwork.com/conditions/#frustrates"
              >
                Big Pharma and women’s health
              </a>
            </li>
            <li className="list-disc color-primary mb-3 md:mb-1">
              <a
                className="primary-color font-normal text-base underline md:mb-1"
                href="https://www.womenshealthnetwork.com/conditions/#damaging"
              >
                Big Pharma isn’t the only business that’s damaging women’s
                health
              </a>
            </li>
            <li className="list-disc color-primary mb-3 md:mb-1">
              {" "}
              <a
                className="primary-color font-normal text-base underline md:mb-1"
                href="https://www.womenshealthnetwork.com/conditions/#Alternative"
              >
                Alternative medicine and women’s health
              </a>
            </li>
            <li className="list-disc color-primary mb-3 md:mb-1">
              {" "}
              <a
                className="primary-color font-normal text-base underline md:mb-1"
                href="https://www.womenshealthnetwork.com/conditions/#scandals"
              >
                10 scandals of women’s health
              </a>
            </li>
          </div>
          <p className="text-base md:text-sm mb-4 font-normal">
            There are also widespread problems with the expense of health care,
            and women’s lack of access to it. But the real question is – why are
            women so sick, and why aren’t they getting better?
          </p>
          <img
            src={womenHealthTwo}
            alt="tempImg1"
            className="flex w-full mb-4"
          />
          <p className="text-lg font-bold md:text-base">
            Chronic disease, conventional medicine, and women’s health
          </p>
          <p className="text-base md:text-sm mb-4 font-normal">
            Common sense tells us that before we can prevent or treat a disease,
            we must understand the root cause. But there is not enough
            discussion about why chronic and degenerative diseases are
            increasing so rapidly, or why women are most likely to be affected.
            The problem with labeling illness as “chronic” is that the focus is
            on managing them, not curing them. Prescription drugs, with serious
            side effects, are given to mask symptoms, but patients receive the
            message to prepare for a gradual downturn in their health. Patients
            have so much faith in their doctors that if they’re told they’ll
            only get worse, they often will and do! Unfortunately, women are
            almost never informed of alternatives to conventional treatments.
            (We’ll come back to that in a moment.)
          </p>
          <p className="text-lg font-bold md:text-base">
            A system that frustrates women and doctors alike
          </p>
          <p className="text-base md:text-sm mb-4 font-normal">
            You probably have a mother, sister, or close friend who has
            struggled for years with a chronic illness or chronic symptoms – and
            they usually have a sad story to tell of a trail of doctors, battles
            with hospitals and insurance companies over billing and
            reimbursement, side effects that often seem as troublesome as the
            initial illness…they’ve been given more pills to deal with those
            side effects…the side effects increase over time while the
            effectiveness of the drugs declines… and always, remorselessly, a
            steady worsening of their condition. This may be your own story.
          </p>
          <img
            src={womenHealthThree}
            alt="tempImg1"
            className="flex w-full mb-4"
          />
          <p>
            So, women can’t fix things all by themselves – but women will be the
            leaders and the catalysts. We think they just need the information
            that’s now missing to be able to do that. We try to provide that on
            a personal level, that is, for women about their own health. Others
            are working on the national policy questions – we recommend you
            <a href="" className="primary-color underline">
              We Woman Care.
            </a>
          </p>
          <p>
            Our mission is to give women that missing information everywhere we
            work – on our website, in our publications, in our videos on
            YouTube, and in social media. If there’s something missing you’d
            like us to cover, write to us at 
            <a
              href="mailto:Floravie.com"
              className="primary-color underline"
            >
              support@Floravie.com.
            </a>
            Or join us on Facebook and post your ideas. We’ll make it happen!
          </p>
        </div>
      </div>
      <WaitingCard />

      <Footer />
    </>
  );
}

export default WomenHealth;

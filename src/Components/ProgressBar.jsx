const periodsData = [
  { start: "Aug 20", end: "Aug 26", days: 30 },

];

const ProgressBar = ({ percentage }) => (
  <div
    style={{ background: "#F6ECEC" }}
    className="relative w-full h-5 rounded-full"
  >
    <div
      className="absolute top-0 left-0 h-full rounded-full"
      style={{ width: `${percentage}%`, background: "#F9B0AA" }}
    ></div>
  </div>
);

const PeriodItem = ({ start, end, days }) => {
  const percentage = (days / 35) * 100;

  return (
    <div className="flex flex-col gap-3 mb-6">
      <div className="flex justify-between text-gray-800">
        <span>{`${start} - ${end}`}</span>
        <span>{days}</span>
      </div>
      <ProgressBar percentage={percentage} />
    </div>
  );
};

const PeriodsHistory = () => (
  <div className="max-w-sm mx-auto">
    <div className="flex items-center gap-3 mb-4">
      <img src="/mymoods/arrowIcon.svg" alt="mood tracker" width={20} />

      <h2 className="text-lg font-semibold text-gray-700">
        Periods History
      </h2>
    </div>
    {periodsData.map((period, index) => (
      <PeriodItem key={index} {...period} />
    ))}
  </div>
);

export default PeriodsHistory;

import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ContributionCycleDetails = () => {
  const { cycleId } = useParams();

  return (
    <div>
      <Link
        to={-1}
        className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-primary-light"
      >
        <ArrowLeft size={17} strokeWidth={1.8} />
        Back to group
      </Link>

      <section className="mt-8">
        <p className="text-sm font-medium text-muted">Contribution Cycle</p>

        <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
          Cycle Details
        </h1>

        <p className="mt-3 text-sm text-muted">Cycle ID: {cycleId}</p>
      </section>
    </div>
  );
};

export default ContributionCycleDetails;

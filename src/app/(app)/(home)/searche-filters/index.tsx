import { Categories } from "./categories";
import SearcheInput from "./searche-input";

interface Props {
  data: any;
}

export const SearfcheFilters = ({ data }: Props) => {
  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full ">
      <SearcheInput />
      <Categories data={data} />
    </div>
  );
};

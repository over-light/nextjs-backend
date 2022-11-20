import type { Dispatch, SetStateAction } from "react";
import { trpc } from "../utils/trpc";

type Props = { setModalOpen: Dispatch<SetStateAction<boolean>>; refetch: any };
const ItemModal = ({ setModalOpen, refetch }: Props) => {
  const mutation = trpc.item.addItem.useMutation();
  const addShoppingList = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    console.log(name);
    if (typeof name !== "string") return;
    await mutation.mutateAsync({ name });
    refetch();
    setModalOpen(false);
  };

  return (
    <form
      onSubmit={addShoppingList}
      className="absolute inset-0 flex items-center justify-center bg-black/75"
    >
      <div className="space-y-4 bg-white p-3">
        <h3 className="text-xl font-medium">Name of Item </h3>
        <input
          required
          type="text"
          name="name"
          className="w-full rounded-md border border-gray-300 bg-gray-200 p-2 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
        />
        <div className="grid grid-cols-2 gap-2">
          <button
            type="reset"
            onClick={() => setModalOpen(false)}
            className="rounded-md bg-gray-500 p-2 text-sm text-white transition hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-violet-500 p-2 text-sm text-white transition hover:bg-violet-600"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

export default ItemModal;

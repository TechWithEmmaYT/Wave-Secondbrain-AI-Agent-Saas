import { parseAsString, useQueryState } from "nuqs";

const useNoteId = () => {
  const [noteId, _setNoteId] = useQueryState(
    "noteId",
    parseAsString.withDefault("")
  );

  const setNoteId = (id: string) => _setNoteId(id);
  const clearNoteId = () => _setNoteId(null);

  return {
    noteId,
    setNoteId,
    clearNoteId,
  };
};

export default useNoteId;

import { parseAsBoolean, useQueryState } from "nuqs";

const useViewState = () => {
  const [isChatView, _setIsChatView] = useQueryState(
    "view",
    parseAsBoolean.withDefault(false).withOptions({
      shallow: false,
    })
  );

  const setIsChatView = (val: boolean) => _setIsChatView(val);
  const clearChatView = () => _setIsChatView(null);

  return {
    isChatView,
    setIsChatView,
    clearChatView,
  };
};

export default useViewState;

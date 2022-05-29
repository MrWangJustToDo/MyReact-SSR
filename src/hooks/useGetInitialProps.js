import { useSelector } from "react-redux";

import { useLoadedLocation } from "components/WrapperRoute";
import { generateInitialPropsKey } from "utils/preLoad";

const globalInitialSelector = (state) => state.client.globalInitialProps.data;

export const useGetInitialProps = () => {
  const globalInitialProps = useSelector(globalInitialSelector);
  const loaded = useLoadedLocation();
  const propsKey = generateInitialPropsKey(loaded?.location.pathname || "", loaded?.query || new URLSearchParams());
  const props = globalInitialProps[propsKey];

  return props;
};

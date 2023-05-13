import { useCallback } from "react";

const Graph3DUI = ({show,showHidePoints,showHideEdges,showHidePolygons}) => {
    const  showHidePanel = useCallback (() => {
        setShowPanel(!showPanel);
    }, [setShowPanel,showPanel]);
}
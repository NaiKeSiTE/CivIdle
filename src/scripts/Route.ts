import React, { useEffect, useState } from "react";
import { getGameState } from "./Global";
import { LoadingPage } from "./ui/LoadingPage";
import { TilePage } from "./ui/TilePage";
import { TypedEvent } from "./utilities/TypedEvent";
import { playClick } from "./visuals/Sound";

export function Route({ event }: { event: TypedEvent<RouteChangeEvent> }) {
   const [{ component, params }, setRoute] = useState<RouteChangeEvent>({
      component: LoadingPage,
      params: {},
   });
   useEffect(() => {
      function handleRouteChanged(e: RouteChangeEvent) {
         if (import.meta.env.DEV) {
            if (e.component === TilePage) {
               console.log(getGameState().tiles[e.params.xy as string]);
            }
         }
         if (e.component !== LoadingPage) {
            playClick();
         }
         setRoute(e);
      }
      event.on(handleRouteChanged);
      return () => {
         event.off(handleRouteChanged);
      };
   }, [event]);
   return React.createElement(component, params);
}

export interface RouteChangeEvent {
   component: React.ElementType;
   params: Record<string, unknown>;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useState } from "react";

export const RefreshApiContext = createContext({
    refreshApi: 1,
    setRefreshApi: (_refreshApi: number) => { },
});

const RefreshApiContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [refreshApi, setRefreshApi] = useState(1);

    return (
        <RefreshApiContext.Provider
            value={{
                refreshApi,
                setRefreshApi
            }}
        >
            {children}
        </RefreshApiContext.Provider>
    );
};

export default RefreshApiContextProvider;


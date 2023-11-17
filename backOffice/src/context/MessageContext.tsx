/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext } from "react";
import { message, Space } from 'antd';

export const MessageContext = createContext({
    success: (_message: string) => { },
    error: (_message: string) => { },
    warning: (_message: string) => { },
});

const MessageContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [messageApi, contextHolder] = message.useMessage();

    const success = (message: string) => {
        messageApi.open({
            type: 'success',
            content: message,
        });
    };

    const error = (message: string) => {
        messageApi.open({
            type: 'error',
            content: message,
        });
    };

    const warning = (message: string) => {
        messageApi.open({
            type: 'warning',
            content: message,
        });
    };

    return (
        <MessageContext.Provider
            value={{
                success,
                error,
                warning
            }}
        >
            {contextHolder}
            <Space className="w-full">
                {children}
            </Space>
        </MessageContext.Provider >
    );
};

export default MessageContextProvider;


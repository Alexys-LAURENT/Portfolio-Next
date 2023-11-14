'use client';
import { ReactNode } from 'react';
import { NextUIProvider } from "@nextui-org/react";


export default function NextUiProvider({ children }: { children: ReactNode }) {
    return <NextUIProvider>{children}</NextUIProvider>;
}
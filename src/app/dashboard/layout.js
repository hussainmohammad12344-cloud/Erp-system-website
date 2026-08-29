'use client';

import {Layout} from "antd";
import {Suspense, useEffect, useState} from "react";

import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import DashboardSider from "@/components/dashboardLayout/DashboardSider";
import DashboardHeader from "@/components/dashboardLayout/DashboardHeader";

const {Content} = Layout;

export default function MainLayout({children}) {

    const screen = useBreakpoint();
    const [siderCollapsed, setSiderCollapsed] = useState(false);

    return (
        <Layout style={{minHeight: "100vh"}} className={"!bg-background"}>
            <DashboardSider siderCollapsed={siderCollapsed}/>
            <Layout className={"!bg-gray-100 dark:!bg-black"}>
                <DashboardHeader siderCollapsed={siderCollapsed} setSiderCollapsed={setSiderCollapsed}/>
                <Content
                    style={{margin: "10px", display: 'flex'}}
                >
                    <div
                        className={"flex-1 p-9 rounded-lg overflow-x-auto w-full bg-background"}
                    >
                        {children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

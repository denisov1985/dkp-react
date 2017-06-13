import Member from '../containers/member/Member';
import Classes from '../containers/member/Classes';
import Login from '../containers/profile/Login';
import UnderConstruction from '../containers/common/UnderConstruction';
 
/**
 * Application routes
 * @type {*[]}
 */
export const routes =
    [
        {
            title: "Login",
            path: "/login",
            alias: "dkp_users",
            component: Login,
        },
        {
            title: "Members",
            path: "/member",
            alias: "dkp_users",
            component: Member,
            children: [
                {
                    title: "Manage",
                    path: "/member/manage",
                    alias: "dkp_users_manage",
                    component: Member
                },
                {
                    title: "Classes",
                    path: "/member/classes",
                    alias: "dkp_users_classes",
                    component: Classes
                }
            ]
        },
        {
            title: "Events",
            path: "/events",
            alias: "dkp_events",
            component: UnderConstruction,
            children: [
                {
                    title: "List",
                    path: "/events",
                    alias: "dkp_users_manage",
                    component: UnderConstruction
                },
                {
                    title: "Types",
                    path: "/events/types",
                    alias: "dkp_users_manage",
                    component: UnderConstruction,
                    children: [
                        {
                            title: "Demo Sub",
                            path: "/events/type/demo",
                            alias: "dkp_users_manage",
                            component: UnderConstruction
                        },
                    ]
                },
                {
                    title: "Settings",
                    path: "/events/settings",
                    alias: "dkp_users_classes",
                    component: UnderConstruction
                }
            ]
        },
        {
            title: "Auction",
            path: "/auction",
            alias: "dkp_users",
            component: UnderConstruction
        },
        {
            title: "Consts",
            path: "/consts",
            alias: "dkp_users",
            component: UnderConstruction
        },
        {
            title: "Media",
            path: "/media",
            alias: "dkp_users",
            component: UnderConstruction
        },
        {
            title: "Settings",
            path: "/settings",
            alias: "dkp_users",
            component: UnderConstruction
        },
    ];

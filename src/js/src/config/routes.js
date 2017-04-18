import Users from '../containers/users/Users';
import UnderConstruction from '../containers/common/UnderConstruction';
 
/**
 * Application routes
 * @type {*[]}
 */
export const routes =
    [
        {
            title: "Users",
            path: "/users",
            alias: "dkp_users",
            component: Users,
            children: [
                {
                    title: "Manage",
                    path: "/users/manage",
                    alias: "dkp_users_manage",
                    component: Users
                },
                {
                    title: "Classes",
                    path: "/users/classes",
                    alias: "dkp_users_classes",
                    component: UnderConstruction
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

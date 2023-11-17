"use client"
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Switch } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { theme, setTheme } = useTheme();
    const test = theme === 'dark' ? false : true;
    console.log(theme);
    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];

    const navbarItems = [{ page: '/', name: 'A propos' }, { page: '/alternance', name: 'Alternance' }, { page: '/projets', name: 'Projets' }, { page: '/contact', name: 'Contact' }]

    const pathName = usePathname();
    console.log(pathName);

    const handleSwitchTheme = () => {
        if (theme === "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    }

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-bgLight dark:bg-bgDark" shouldHideOnScroll>

            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <p className="font-bold text-inherit text-textDark dark:text-textLight">Alexys LAURENT</p>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent justify="end">


                {navbarItems.map((item, index) => (
                    item.page === pathName ? (
                        <NavbarItem isActive key={`navbar-item-${index}`} className="hidden sm:flex">
                            <Link className="text-[#256949] font-extrabold" href={item.page} aria-current="page">
                                {item.name}
                            </Link>
                        </NavbarItem>
                    ) : (
                        <NavbarItem key={`navbar-item-${index}`} className="hidden sm:flex">
                            <Link className="font-light text-textDark dark:text-textLight" color="foreground" href={item.page}>
                                {item.name}
                            </Link>
                        </NavbarItem>
                    )
                ))}
                <NavbarItem>

                    <Switch key={pathName} onValueChange={handleSwitchTheme} defaultSelected={theme === "dark" ? false : true} isSelected={theme === "dark" ? false : true} />

                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                {navbarItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                item.page === pathName ? "primary" : "foreground"
                            }
                            className={`w-full ${item.page === pathName ? "font-bold" : "font-light"} ${item.page != pathName && " text-textDark dark:text-textLight"}`}
                            href="#"
                            size="lg"
                        >
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
                <NavbarItem>
                    {
                        <Switch key={pathName} onValueChange={handleSwitchTheme} defaultSelected={theme === "dark" ? false : true} isSelected={theme === "dark" ? false : true} />

                    }
                </NavbarItem>
            </NavbarMenu>
        </Navbar>
    );
}

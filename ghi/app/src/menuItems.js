export const menuItems=[
    {
        title: "Home"
    },
    {
        title: "Inventory", 
        submenu: [
            {
                title: "Manufacturers",
                href: "/manufacturers",
            },
            {
                title: "New Manufacture",
                href: "/manufacturers/new",
            },
            {
                title: "Vehicle Models",
                href: "/models",
            },
            {
                title: "New Vehicle Model",
                href: "/models/new",
            },
            {
                title: "Automobiles",
                href: "/automobiles",
            },
            {
                title: "New Automobile",
                href: "/automobiles/new",
            },
        ]
    },
    {
        title: "Services",
        submenu: [
            {
                title: "New Technician",
                href: "/technicians/new",
            },
            {
                title: "New Appointment",
                href: "/appointments/new",
            },
            {
                title: "Appointments",
                href: "/appointments",
            },
            {
                title: "Service History",
                href: "/appointments/history",
            },
        ]
    },
    {
        title: "Sales",
        submenu: [
            {
                title: "New Sales Person",
                href: "/sales_persons/new",
            },
            {
                title: "New Potential Customer",
                href: "/potential_customers/new",
            },
        ]
    },
];
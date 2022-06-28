import MenuItems from "./MenuItem";

const Dropdown = ( {submenus, dropdown }) => {
    return (
        <ul className={`dropdown ${dropdown ? "show" : ""}`}>
            {submenus.map((submenu, index) => (
                <MenuItems items={submenu} key={index} />
            ))}
        </ul>
    );
};
export default Dropdown;
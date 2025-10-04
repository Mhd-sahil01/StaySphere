import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faHeart,
  faCalendarCheck,
  faBuilding,
  faEnvelope,
  faMoneyBill,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

function UserPage() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { key: "profile", label: "Profile", icon: faUser },
    { key: "wishlist", label: "Wishlist", icon: faHeart },
    { key: "properties", label: "My Properties", icon: faBuilding },
    { key: "messages", label: "Messages", icon: faEnvelope },
    // { key: "settings", label: "Settings", icon: faCog },
    { key: "logout", label: "Logout", icon: faSignOutAlt },
  ];

  const renderContent = () => {
    switch (active) {
      case "home":
        return { title: "Home", text: "Welcome to your rental dashboard!" };
      case "profile":
        return { title: "Profile", text: "Edit your personal info here." };
      case "wishlist":
        return { title: "Wishlist", text: "Manage your saved properties." };
      case "bookings":
        return { title: "My Bookings", text: "Check your reservations." };
      case "properties":
        return { title: "My Properties", text: "Manage your rentals." };
      case "messages":
        return { title: "Messages", text: "Chat with hosts or guests." };
      case "payments":
        return { title: "Payments", text: "View transactions and payouts." };
      case "settings":
        return { title: "Settings", text: "Manage preferences & privacy." };
      case "logout":
        return { title: "Logout", text: "You have been logged out." };
      default:
        return { title: "", text: "" };
    }
  };

  return (
    <div className="min-h-[80vh] flex p-6">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-64 bg-black text-white flex-col rounded-l-2xl">
        <h2 className="text-xl font-bold p-6 border-b border-gray-700">
          StaySphere
        </h2>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActive(item.key)}
              className={`flex items-center gap-3 p-3 rounded-lg w-full text-left transition ${
                active === item.key
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800"
              }`}
            >
              <FontAwesomeIcon icon={item.icon} className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

{/* Mobile Menu */}
<div className="md:hidden text-black hover:font-bold">
  <button
    onClick={() => setMenuOpen(!menuOpen)}
    className="text-2xl focus:outline-none"
    aria-label="Toggle Menu"
  >
    ☰
  </button>
</div>

{/* Mobile Sidebar */}
<div
  className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-40 transform transition-transform duration-300 ease-in-out md:hidden overflow-y-auto mt-16 ${
    menuOpen ? "translate-x-0" : "-translate-x-full"
  }`}
>
  {/* Menu Items */}
  <div className="p-4">
    {menuItems.map((item) => (
      <button
        key={item.key}
        onClick={() => {
          setActive(item.key);
          setMenuOpen(false);
        }}
        className={`flex items-center gap-3 p-3 rounded-lg w-full text-left transition ${
          active === item.key
            ? "bg-blue-600 text-white"
            : "hover:bg-gray-800"
        }`}
      >
        <FontAwesomeIcon icon={item.icon} className="h-5 w-5" />
        <span>{item.label}</span>
      </button>
    ))}
  </div>
</div>


      {/* Content in the items */}
      <main className="flex-1 bg-gray-100 p-8 rounded-r-2xl md:ml-0 mt-14 md:mt-0">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {renderContent().title}
        </h2>
        <p className="text-gray-600">{renderContent().text}</p>
      </main>
    </div>
  );
}

export default UserPage;
export default function BotonPrimario({ children, onClick, type = "button", className = "" }) {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`w-full bg-[#1789FC] hover:bg-[#273043] text-white font-medium py-2 px-4 rounded-lg transition ${className}`}
      >
        {children}
      </button>
    );
  }
  
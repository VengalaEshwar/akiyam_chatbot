import "./ToggleButton.css";

function ToggleButton({ isDark, setIsDark }) {
  return (
    <label className="switch">
      <input type="checkbox" onClick={() => setIsDark(!isDark)} />
      <span className="slider"></span>
    </label>
  );
}

export default ToggleButton;
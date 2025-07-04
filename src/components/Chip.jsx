import React from "react";
import PropTypes from "prop-types";
import "./Chip.css";

const Chip = ({label, selected, onClick}) => (
    <button
        type="button"
        className={`chip-btn${selected ? " selected" : ""}`}
        onClick={onClick}
        tabIndex={0}
        aria-pressed={selected}
    >
        {label}
    </button>
);

Chip.propTypes = {
    label: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};

export default Chip;

import "bootstrap-icons/font/bootstrap-icons.css";
import React, {useState} from "react";
import Select from "react-select";
import {searchOptions} from "./SelectDropdown.service";
import "./SelectDropdown.css"
import PropTypes from "prop-types";

export function SelectDropdown({onOptionSelect, placeholderTag}) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([]);

    const changeOptions = (value) => {
        searchOptions(value)
            .then(res => res.data.stations)
            .then(stations => stations.map(e => {
                return {
                    value: e.name,
                    label: e.name
                }
            }))
            .then(e => setOptions(e))
    }
    const handleSelect = (value) => {
        setSelectedOption(value);
        onOptionSelect(value)
    }
    const handleMenuOpened = () => {
        changeOptions(selectedOption?.value || "a")
    }
    return (

        <>
            <Select
                styles={{ control: (base) => ({ ...base, width: "20em", height: "4em"})}}
                className="dropdown-size"
                selectedOption={selectedOption}
                onMenuOpen={handleMenuOpened}
                onInputChange={changeOptions}
                onChange={handleSelect}
                options={options}
                placeholder={placeholderTag}
            />
        </>
    );
}

SelectDropdown.propTypes = {
    placeholderTag: PropTypes.string,
    onOptionSelect: PropTypes.func
};

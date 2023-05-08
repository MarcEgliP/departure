import "bootstrap-icons/font/bootstrap-icons.css";
import {useState} from "react";
import Select from "react-select";
import {searchOptions} from "./SelectDropdown.service";


export function SelectDropdown({onOptionSelect}) {
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
                selectedOption={selectedOption}
                onMenuOpen={handleMenuOpened}
                onInputChange={changeOptions}
                onChange={handleSelect}
                options={options}
            />
        </>
    );
}
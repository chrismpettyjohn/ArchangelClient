export const SELECT_DARK_THEME = {
    control: (base: any) => ({
        ...base,
        backgroundColor: "#333",
        color: "#fff",
        borderColor: "#444",
    }),
    menu: (base: any) => ({
        ...base,
        backgroundColor: "#333",
    }),
    singleValue: (base: any) => ({
        ...base,
        color: "#fff",
    }),
    option: (base: any, state: any) => ({
        ...base,
        backgroundColor: state.isFocused ? "#444" : "#333",
        color: "#fff",
    }),
};

export function getSelectDarkTheme(theme: any) {
    return {
        ...theme,
        colors: {
            ...theme.colors,
            primary25: "#444",
            primary: "#333",
            neutral0: "#333",
        },
    }
}
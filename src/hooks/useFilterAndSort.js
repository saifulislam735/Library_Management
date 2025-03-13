// useFilterAndSort.js
const useFilterAndSort = (items, search, category, sortByDownloads) => {
    const filteredItems = items
        .filter(
            (item) =>
                (category === "All" || item.category === category) &&
                item.title.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
            if (sortByDownloads === "0") return 0;
            return b.downloadsCount - a.downloadsCount;
        });

    return filteredItems;
};

export default useFilterAndSort;
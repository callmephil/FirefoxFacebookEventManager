const clearStorage = () => {
    const onCleared = () => {
        alert("Storage Cleared");
    }

    const onError = (e) => {
        console.log(e);
    }

    var clearStorage = browser.storage.local.clear();
    clearStorage.then(onCleared, onError);
}

const getLocalStorage = async () => {
    const onGot = (item) => {
        const StoredList = [];
        for (key in item) {
            StoredList.push(item[key].id);
        }
        return StoredList;
    };

    const onError = (e) => {
        console.log(`Error: ${e}`)
    }

    const gettingItem = browser.storage.local.get();
    return gettingItem.then(onGot, onError);
}

const formatLink = (link) => {
    return link.match("events/(.*)\\?acontext")[1];
}

const setStorage = (link) => {
    const eventID = formatLink(link);
    browser.storage.local.set({
        [eventID]: {
            id: eventID,
            link: link
        }
    });
}
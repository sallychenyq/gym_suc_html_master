// Description: 消息提示
export const success = function (title, options={}) {
    uni.showToast({
        title: title || '成功',
        icon: 'success',
        duration: options.duration || 2000
    });
}
export const error = function (title, options={}) {
    uni.showToast({
        title: title || '失败',
        icon: 'none',
        duration: options.duration || 2000
    });
}
export const loading = function (title, options={}) {
    uni.showLoading({
        title: title || '加载中',
        mask: options.mask || true
    });
}
export const hideLoading = function () {
    uni.hideLoading();
}
export const showModal = function (content,title, options={}) {
    return new Promise((resolve, reject) => {
        uni.showModal({
            title: title || '提示',
            content: content,
            cancelText: options.cancelText || '不了',
            confirmText: options.confirmText || '好的',
            editable: options.editable || false,
            success: function (res) {
                if (res.confirm) {
                    resolve(res);
                } else if (res.cancel) {
                    reject();
                }
            }
        });
    })
}
export const showActionSheet=function (title, items) {
    console.log(items);
    const itemList = items.map(item => item.name);
    uni.showActionSheet({
        title: title,
        itemList: itemList,
        success: function (res) {
            items[res.tapIndex].action();
        },
        fail: function (res) {},
        complete: function (res) {
            console.log(res);
        }
    });
}

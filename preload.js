const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('medicinePoint', {
    getData: () => ipcRenderer.invoke('get-data'),
    saveData: (data) => ipcRenderer.invoke('save-data', data),

    getAdminPassword: () => ipcRenderer.invoke('get-admin-password'),
    setAdminPassword: (password) =>
        ipcRenderer.invoke('set-admin-password', password),

    getMedicines: () => ipcRenderer.invoke('get-medicines'),
    saveMedicines: (data) => ipcRenderer.invoke('save-medicines', data),

    getPurchases: () => ipcRenderer.invoke('get-purchases'),
    savePurchases: (data) => ipcRenderer.invoke('save-purchases', data),

    getCustomers: () => ipcRenderer.invoke('get-customers'),
    saveCustomers: (data) => ipcRenderer.invoke('save-customers', data),

    getSuppliers: () => ipcRenderer.invoke('get-suppliers'),
    saveSuppliers: (data) => ipcRenderer.invoke('save-suppliers', data),

    getSales: () => ipcRenderer.invoke('get-sales'),
    saveSales: (data) => ipcRenderer.invoke('save-sales', data)
});

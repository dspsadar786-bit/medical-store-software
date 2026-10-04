const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

const dataFile = path.join(app.getPath('userData'), 'medicine-point-data.json');

const defaultData = {
    adminPassword: 'admin123',
    medicines: [],
    purchases: [],
    customers: [],
    suppliers: [],
    sales: []
};

function loadData() {
    try {
        if (fs.existsSync(dataFile)) {
            const savedData = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

            return {
                ...defaultData,
                ...savedData
            };
        }
    } catch (error) {
        console.error('Error loading data:', error);
    }

    return { ...defaultData };
}

function saveData(data) {
    try {
        fs.writeFileSync(
            dataFile,
            JSON.stringify(data, null, 2),
            'utf8'
        );

        return true;
    } catch (error) {
        console.error('Error saving data:', error);
        return false;
    }
}

let database = loadData();

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1100,
        minHeight: 700,

        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    mainWindow.loadFile('index.html');

    // Development ke waqt DevTools kholne ke liye
    // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});


/* ================================
   DATABASE / DATA OPERATIONS
================================ */

ipcMain.handle('get-data', () => {
    return database;
});


ipcMain.handle('save-data', (event, newData) => {
    database = {
        ...defaultData,
        ...newData
    };

    return saveData(database);
});


ipcMain.handle('get-admin-password', () => {
    return database.adminPassword;
});


ipcMain.handle('set-admin-password', (event, password) => {
    database.adminPassword = password;
    return saveData(database);
});


/* ================================
   MEDICINES
================================ */

ipcMain.handle('get-medicines', () => {
    return database.medicines;
});


ipcMain.handle('save-medicines', (event, medicines) => {
    database.medicines = medicines;
    return saveData(database);
});


/* ================================
   PURCHASES
================================ */

ipcMain.handle('get-purchases', () => {
    return database.purchases;
});


ipcMain.handle('save-purchases', (event, purchases) => {
    database.purchases = purchases;
    return saveData(database);
});


/* ================================
   CUSTOMERS
================================ */

ipcMain.handle('get-customers', () => {
    return database.customers;
});


ipcMain.handle('save-customers', (event, customers) => {
    database.customers = customers;
    return saveData(database);
});


/* ================================
   SUPPLIERS
================================ */

ipcMain.handle('get-suppliers', () => {
    return database.suppliers;
});


ipcMain.handle('save-suppliers', (event, suppliers) => {
    database.suppliers = suppliers;
    return saveData(database);
});


/* ================================
   SALES
================================ */

ipcMain.handle('get-sales', () => {
    return database.sales;
});


ipcMain.handle('save-sales', (event, sales) => {
    database.sales = sales;
    return saveData(database);
});

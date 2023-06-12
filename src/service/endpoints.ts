const PATH = 'http://srv-app-consent.sochi-park.ru'

const endpoints = {

    login: `${PATH}admin/login.php`,

    getArchs: `${PATH}admin/archives/get_archives.php`,

    editArch: `${PATH}admin/archives/change_archive.php`,

    addArch: `${PATH}admin/archives/add_archive.php`,

    deleteArch: `${PATH}admin/archives/delete_archive.php`,

    getEmps: `${PATH}admin/employees/get_employees.php`,

    getCats: `${PATH}admin/templates/get_categories.php`,

    addCat: `${PATH}admin/templates/add_category.php`,  

    deleteCat: `${PATH}admin/templates/delete_category.php`,

    editCat: `${PATH}admin/templates/change_category.php`,  

    deleteSubcat: `${PATH}admin/templates/delete_sub_category.php`,

    editSubcat: `${PATH}admin/templates/change_sub_category.php`,

    getTemps: `${PATH}admin/templates/get_templates.php`,

    getTemp: `${PATH}admin/templates/get_template.php`,

    editTemp: `${PATH}admin/templates/change_template.php`,

    addTemp: `${PATH}admin/templates/add_template.php`,

    deleteTemp: `${PATH}admin/templates/delete_template.php`,

    getInputsFromFile: `${PATH}admin/templates/get_inputs_from_file.php`,

    getDataTypes: `${PATH}admin/templates/get_creation_data.php`,

    getStations: `${PATH}admin/stations/get_stations.php`,

    getPrinters: `${PATH}admin/printers/get_printers.php`,

    addPrinter: `${PATH}admin/printers/add_printer.php`,

    editPrinter: `${PATH}admin/printers/change_printer.php`,

    deletePrinter: `${PATH}admin/printers/delete_printer.php`,


    editStation: `${PATH}admin/stations/change_station.php`,

    deleteStation: `${PATH}admin/stations/delete_station.php`,


    getDocs: `${PATH}admin/get_documents.php`,

    changeDocStatus: `${PATH}admin/change_status.php`,


    getFolderCount: `${PATH}admin/get_folder_count.php`,
    setFolderCount: `${PATH}admin/set_folder_count.php`,


    addSubcat: `${PATH}admin/templates/add_sub_category.php`,

    editTerminal: `${PATH}admin/terminals/change_terminal.php`,
    deleteTerminal: `${PATH}admin/terminals/delete_terminal.php`,

    reportSendMail: `${PATH}admin/send_report_email.php`,
    reportPrint: `${PATH}admin/print_report.php`

    
}
export default endpoints;
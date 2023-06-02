const PATH = 'https://soultri.site/sochi_park/api/'

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

    getPrinters: `${PATH}admin/printers/get_printers.php`

}

export default endpoints;
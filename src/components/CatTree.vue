<template>
    <div class="container" >
        <ejs-treeview id='treeview' :fields="{dataSource: categories, id: "id", text: "name", child: "children"}" :allowDragAndDrop='true'></ejs-treeview>
        <!-- {{ categories }} -->
    </div>
  </template>
  
  <script>
    import { TreeViewComponent as EjsTreeview } from "@syncfusion/ej2-vue-navigations";
  import api from '@/api';
  export default {
    components: {
        EjsTreeview
    },
    data() {
        return {
            categories: [], 
            treeOptions: {
            
            },
        };
    },
    created() {
        this.fetchCategories();
    },

    methods: {
        async fetchCategories() {
            try {
                const response = await api.get('/categories');
                this.categories = response.data;
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        },
    
    },
  };
  </script>
  <style>
    @import "../node_modules/@syncfusion/ej2-base/styles/material.css";
    @import "../node_modules/@syncfusion/ej2-vue-navigations/styles/material.css";
    @import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
    @import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
</style>
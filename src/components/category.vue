<template>
    <div class="bg-white pt-2">
        <div class="container">
            <b-alert
                :show="dismissCountDown"
                dismissible
                variant="warning"
                @dismissed="dismissCountDown=0"
                @dismiss-count-down="countDownChanged"
                >
                {{ alertMSG }} 
            </b-alert>
            <div class="row">
                <div class="col-6">
                    <h1 class="">Categories</h1>
                </div>
                <div class="col-6">
                    <b-button class="m-2" variant="outline-danger" @click="catModal = true"> Add </b-button>
                </div>
            </div>
            
            
            <b-table :items="categories"
                :fields="[
                    {key: 'name', label:'Name'}, 
                    {key: 'description', label:'Description'},
                    { key: 'img_route', label: 'Image' }, 
                    { key: 'Action', label: 'Action' }, 
                ]"
            >
                <template #cell(name) ="data">
                                
                    {{ data.item.name.ar }} / {{ data.item.name.en }}
                </template>
                <template #cell(img_route) ="data">
                    <img :src="data.item.img_route" :alt="data.item.image" width="100px" height="80" />
                </template>
                <template #cell(Action)="data">
                    <button class="btn btn-sm btn-warning " >   
                        <b-icon icon="pencil-fill"  @click="showCatModal(data.item)"></b-icon>
                    </button>
                    <button class="btn btn-sm btn-danger m-2" >   
                        <b-icon icon="trash-fill"  @click="checkDeleteCat(data.item)"></b-icon>
                    </button>
                    
                    
                </template>
            </b-table>
        </div>
        <b-modal ref="my-model" hide-header-close id="dd" size="lg" v-model="catModal"  hide-footer title="Category">
                        
            <b-row>
                <b-col lg="6" md="6" sm="12" >
                    <b-form-group label="Arabic Name">
                        
                            <b-form-input v-model="cat.name_ar" >
                            </b-form-input>
                            
                        
                    </b-form-group>
                </b-col>
                <b-col lg="6" md="6" sm="12" >
                    <b-form-group label="English Name">
                        
                            <b-form-input v-model="cat.name_en" >
                            </b-form-input>
                            
                        
                    </b-form-group>
                </b-col>
                
            </b-row>
            <b-row>
                
                <b-col lg="6" md="6" sm="12" >
                    <b-form-group label="Description">
                        
                            <b-form-input v-model="cat.desc" >
                            </b-form-input>
                            
                        
                    </b-form-group>
                </b-col>
                <b-col lg="6" md="6" sm="12" >
                    <b-form-group label="Parent Category">
                        
                        <v-select :options="categories" v-model="cat.parent_id" :reduce="(val)=>val.id">
                            <template v-slot:option="option">
                                {{ option.name.ar }}
                            </template>
                            <template #selected-option="{name}">
                                <strong>
                                    {{ name.ar}}
                                </strong>
                            </template>
                        </v-select>
                            
                        
                    </b-form-group>
                </b-col>
                
            </b-row>
            <b-row>
                <b-col lg="6" md="6" sm="12">
                    <b-form-group label="Image">
                        <input type="file" accept="image/apng,image/png,image/jpg,image/jpeg,image/webp"
                            @change="previewCat_img($event)" ref="cat_img"
                        />
                    </b-form-group>
                </b-col>
                
            </b-row>
            <div class="mt-2">
                <b-col cols="12">
                    <div class="justify-content-end">
                        <b-button variant="outline-success " class="mr-1" @click="submitCategory()"> confirm </b-button>
                        <b-button variant="outline-danger" @click="catModal = false"> cancel </b-button>
                    </div>
                </b-col>
            </div>
                    
            
        </b-modal>
        <b-modal ref="my-model" hide-header-close id="dd" size="lg" v-model="deleteCatModal"  hide-footer title="Delete Category">
                        
                        
                        <b-row>
                            <h4> Are you sure Delete</h4>
                            
                        </b-row>
                        <div class="mt-2">
                            <b-col cols="12">
                                <div class="justify-content-end">
                                    <b-button variant="outline-success " class="mr-1" @click="deleteCat()"> confirm </b-button>
                                    <b-button variant="outline-danger" @click="deleteCatModal = false"> cancel </b-button>
                                </div>
                            </b-col>
                        </div>
                                
                        
                    </b-modal>
    </div>
</template>

<script>
import {
        BFormInput,
        BFormGroup,
        BRow,
        BCol,
        BButton,
        BModal,
        BTable,
        BIcon,
    } from 'bootstrap-vue'
    import VSelect from 'vue-select'
import api from '../api.js'
export default {
    name:'category-vue',
    components:{
        VSelect,
        BFormInput,
        BIcon,
        BFormGroup,
        
        BRow,
        BCol,
        
        BButton,
        
        BModal,
        
        BTable,
        
  },
    data() {
        return {
            dismissSecs: 5,
            dismissCountDown: 0,
            alertMSG:"",
            categories: [],
            catModal:false,
            cat:{
                name_ar:'',
                name_en:'',
                desc:'',
                parent_id:'',
                image:'',
            }   ,
            cat_id : null, 
            deleteCatModal:false,
        };
    },
    created() {
        this.fetchCategories();
    },
    methods:{
        async fetchCategories() {
            try {
                const response = await api.get('/categories');
                this.categories = response.data;
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        },
        showCatModal($cat){
            if($cat){
                this.cat.name_ar= $cat.name.ar ;
                this.cat.name_en=$cat.name.en ;
                this.cat.parent_id=$cat.parent_id;
                this.cat.desc = $cat.description;
                this.cat_id = $cat.id;
            }
            this.catModal = true;
            
        },
        async submitCategory(){
            
            const cat_data = new FormData();
                cat_data.append('image',this.cat.image)
                cat_data.append('name_ar',this.cat.name_ar)
                cat_data.append('name_en',this.cat.name_en)
                cat_data.append('desc',this.cat.desc)
                cat_data.append('parent_id',this.cat.parent_id)
            try {
                if (this.cat_id ==  null) {
                    await api.post('/addCat',cat_data);    
                } else {
                    await api.post(`/addCat/${this.cat_id}`,cat_data);    
                }
                this.alertMSG = "Added Successfully";
                this.showAlert();
                this.fetchCategories();
                this.cat.image = null; 
                this.cat.name_ar = null; 
                this.cat.name_en = null; 
                this.cat.desc = null; 
                this.catModal = false;
                
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
            

        },
        previewCat_img(e){
            this.cat.image = this.$refs.cat_img.files[0];
            console.log(this.cat.image);
            console.log(e);
        },
        checkDeleteCat($cat){
            this.cat = $cat;
            this.deleteCatModal = true;
        },
        async deleteCat(){
            try {
                const response = await api.post(`/delete/${this.cat.id}`);   
                console.log('response', response.data.message);
                this.fetchCategories();
                this.deleteCatModal = false;
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
            
            
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        showAlert() {
            this.dismissCountDown = this.dismissSecs
        }
    }
    }

</script>

<style>

</style>
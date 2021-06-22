<template>
    <div>
        <h2 class="content-block">{{title}}</h2>
        <DxDataGrid
            class="dx-card wide-card"
            :data-source="dataSource"
            :show-borders="false"
            :remote-operations="true"
            :row-alternation-enabled="true"
        >
            <DxColumn
            data-field="prodId"
            data-type="number"
            :allow-editing="false"
            :caption="formatMessage('prodId')"
            />
            <DxColumn
            data-field="prodName"
            data-type="string"
            :caption="formatMessage('prodName')"
            />
            <DxColumn
            data-field="spec"
            data-type="string"
            :caption="formatMessage('spec')"
            />
            <DxColumn
            data-field="prodPrice"
            data-type="number"
            :caption="formatMessage('prodPrice')"
            :format="formatCurrency()"
            />
            <!-- format="#,##0" -->
            <DxColumn
            data-field="regDate"
            data-type="date"
            :allow-editing="false"
            :caption="formatMessage('regDate')"
            :format="formatDate()"
            />
            <!--format="yyyy-MM-dd HH:mm:SS"-->
            <DxEditing
                mode="row"
                :allow-updating="true"
                :allow-adding="true"
                :allow-deleting="true"
            />
            <DxPaging :page-size="3"/>
            <DxPager
            :show-page-size-selector="true"
            :show-info="true"
            :allowed-page-sizes="[3, 5, 10]"
            />
        </DxDataGrid>
    </div>
</template>
<script>

import { DxDataGrid, DxColumn, DxPaging, DxPager, DxEditing } from 'devextreme-vue/data-grid';
import CustomStore from 'devextreme/data/custom_store';
// import 'whatwg-fetch';

// function isNotEmpty(value) {
//   return value !== undefined && value !== null && value !== '';
// }

import { formatMessage } from 'devextreme/localization';
import localedata from '../locale/bos-locale';

function handleErrors(response) {
    console.log(response);
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

const store = new CustomStore({
    key: 'prodId',
    load: function(loadOptions) {
        // let params = '?';
        // [
        // 'skip',
        // 'take',
        // 'requireTotalCount',
        // 'requireGroupCount',
        // 'sort',
        // 'filter',
        // 'totalSummary',
        // 'group',
        // 'groupSummary'
        // ].forEach(function(i) {
        // if(i in loadOptions && isNotEmpty(loadOptions[i]))
        // { params += `${i}=${JSON.stringify(loadOptions[i])}&`; }
        // });
        // params = params.slice(0, -1);
        // const session = this.$cookies.get("SESSION");
        // console.log("cookie : "+session);
        return fetch(`/api/product/list`, {
                method: 'POST',
                body: JSON.stringify(loadOptions),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            return {
                data: data.items,
                totalCount: data.totalItems,
                summary: data.summary,
                groupCount: data.groupCount
            };
        })
        .catch(() => { throw 'Data Loading Error'; });
    },
    update: (key, values) => {
        return fetch(`/api/product/${encodeURIComponent(key)}`, {
            method: 'PUT',
            body: JSON.stringify(values),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(handleErrors)
        .catch(() => { throw 'Network error' });
    },
    insert: (values) => {
        return fetch(`/api/product`, {
            method: 'POST',
            body: JSON.stringify(values),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(handleErrors)
        .catch(() => { throw 'Network error' });
    }
});

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxPager,
    DxEditing,
  },
  data() {
    return {
        dataSource: store,
        title: formatMessage("prodListTitle")
    };
  },
  methods: {
    formatMessage: formatMessage,
    formatCurrency: localedata.formatCurrency,
    formatDate: localedata.formatDate

  }
};
</script>

<style scoped>
.dx-datagrid .dx-row .dx-widget {  
  height: 15px;  
} 
</style>
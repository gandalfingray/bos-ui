<template>
  <div>
      <h2 class="content-block">{{title}}</h2>
    <DxTreeList
      id="treelist"
      :data-source="dataSource"
      :show-borders="true"
      key-expr="commCd"
      parent-id-expr="commCdGrp"
      has-items-expr="hasChild"
      root-value="root"
    >
        <DxRemoteOperations
        :filtering="true"
        />
        <DxEditing
          :allow-updating="true"
          :allow-deleting="true"
          :allow-adding="true"
          mode="row"
        />
        <DxColumn
        data-field="commCd"
        data-type="string"
        caption="코드"
        />
        <DxColumn
        data-field="commNm"
        data-type="string"
        caption="코드 이름"
        />
        <DxColumn
        data-field="useYn"
        data-type="string"
        caption="사용여부"
        />
        <DxColumn
        data-field="regDate"
        data-type="date"
        caption="등록일"
        />
        <DxColumn
        data-field="chgDate"
        data-type="date"
        caption="수정일"
        />
        <DxPaging
        :enabled="true"
        :page-size="10"
      />
        <DxPager
            :show-page-size-selector="true"
            :allowed-page-sizes="allowedPageSizes"
            :show-info="true"
        />
    </DxTreeList>
  </div>
</template>
<script>
// import { employees } from './data.js';
import { DxTreeList, DxColumn, DxRemoteOperations, DxEditing, DxPaging, DxPager } from 'devextreme-vue/tree-list';

// Globalization
import { formatMessage } from 'devextreme/localization';

export default {
  components: {
    DxTreeList, DxColumn, DxRemoteOperations, DxEditing, DxPaging, DxPager
  },
  data() {
    return {
        title: formatMessage("commCodeListTitle"),
        allowedPageSizes: [5, 10, 20],
        dataSource: {
            key: 'commCd',
            load: function(loadOptions) {
                let parentIdsParam = loadOptions.parentIds;
                // let commCd = parentIdsParam[parentIdsParam.length-1];
                // console.log(parentIdsParam.length);
                // console.log(commCd);
                // if (Array.isArray(parentIdsParam)){
                //     console.log("parentIdsParam is array...");
                //     parentIdsParam = parentIdsParam[parentIdsParam.lenght-1];
                // }
                return fetch(`/api/commCodes/${parentIdsParam[0]}`)
                        .then(response => response.json())
                        .catch(() => { throw 'Data Loading Error'; });
            },
            update: (key, values) => {
                return fetch(`/api/commCode/${encodeURIComponent(key)}`, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })
                .catch(() => { throw 'Network error' });
            },
            insert: (values) => {
                return fetch(`/api/commCode`, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })
                .catch (() => { throw 'Network error' });
            }
        }
    };
  }
};
</script>
<style scoped>
#treelist {
    max-height: 500px;
}
</style>

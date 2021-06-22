<template>
  <div>
    <DxTreeList
      id="employees"
      :data-source="commcode"
      root-value=""
      :expanded-row-keys="expandedRowKeys"
      :show-row-lines="true"
      :show-borders="true"
      :column-auto-width="true"
      has-items-expr="hasChild"
      key-expr="commCd"
      parent-id-expr="commCdGrp"
    >
                <!-- <DxColumn
            data-field="commCdGrp"
            data-type="string"
            caption="코드 그룹"
            /> -->
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
            />
            <DxRemoteOperations
                :filtering="true"
            />
            <DxPaging
                :enabled="true"
                :page-size="3"
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
import { DxTreeList, DxColumn, DxPaging, DxPager, DxRemoteOperations } from 'devextreme-vue/tree-list';

export default {
  components: {
    DxTreeList, DxColumn, DxPaging, DxPager, DxRemoteOperations
  },
  data() {
    return {
      commcode:
      {
            load: function(loadOptions) {
                let parentIdsParam = loadOptions.parentIds;

                console.log(loadOptions);

                // parentIdsParam = (parentIdsParam == undefined )? 'root' : parentIdsParam[0];

                return fetch(`/api/commCodes/${parentIdsParam}`)
                    .then(response => response.json())
                    .catch(() => { throw 'Data Loading Error'; });
            }
        },
      expandedRowKeys: [1],
      allowedPageSizes: [3, 5, 10]
    };
  }
};
</script>
<style scoped>
#employees {
    max-height: 440px;
}
</style>

export const AUDIT = "audit";
export const TEST = "test";
export const CREATE = "create";
export const DELETE = "delete";
export const EDIT = "edit";

export const auditPermission = [AUDIT]; //加一个让参数变成数组
export const managerPermission = [CREATE, DELETE, EDIT];
export const fullPermission = [AUDIT, CREATE, DELETE, EDIT];
export default {
  props: {
    permissions: {
      type: [Array, String],
      default: function() {
        return fullPermission;
      }
    }
  },
  data() {
    return {
      auditPermission: auditPermission,
      managerPermission: managerPermission,
      fullPermission: fullPermission
    };
  },
  computed: {
    hasAuditPermission() {
      return this.checkPermission(this.permissions, AUDIT);
    },
    hasCreatePermission() {
      return this.checkPermission(this.permissions, CREATE);
    },
    hasDeletePermission() {
      return this.checkPermission(this.permissions, DELETE);
    },
    hasEditPermission() {
      return this.checkPermission(this.permissions, EDIT);
    }
  },
  methods: {
    checkPermission(permissions, permissionItem) {
      if (permissions instanceof Array) {
        return permissions && permissions.includes(permissionItem);
      } else if (permissions instanceof String) {
        return permissions && permissions.search(permissionItem) >= 0;
      } else {
        return false;
      }
    }
  }
};

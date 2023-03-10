<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">登录 Dafou CR</div>
    <n-space class="login-form-sub-title">
      如果一味地关注过去的原因，企图仅仅靠原因去解释事物，那就会陷入“决定论”
    </n-space>
    <n-form
      ref="formRef"
      :model="userInfo"
      :rules="userRules"
      class="login-form"
    >
      <n-form-item path="account" :show-label="false">
        <n-input
          v-model:value="userInfo.account"
          clearable
          placeholder="用户名: admin"
        >
          <template #prefix>
            <n-icon :component="User" />
          </template>
        </n-input>
      </n-form-item>
      <n-form-item path="password" :show-label="false">
        <n-input
          v-model:value="userInfo.password"
          type="password"
          current-password
          clearable
          show-password-on="mousedown"
          placeholder="密码: admin"
        >
          <template #prefix>
            <n-icon :component="Lock" />
          </template>
        </n-input>
      </n-form-item>
      <n-space class="login-action-container" vertical>
        <div class="login-form-password-actions">
          <n-checkbox
            :checked="userInfo.rememberPassword"
            size="small"
            :default-checked="userInfo.rememberPassword"
            @on-update:checked="setRememberPassword"
          >
            记住密码
          </n-checkbox>
          <a>忘记密码</a>
        </div>
        <n-button
          class="login-action-submit"
          type="primary"
          :loading="loading"
          @click="handleSubmit"
        >
          登录
        </n-button>
        <n-button quaternary class="login-form-register-btn">
          注册账号
        </n-button>
      </n-space>
    </n-form>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
// import { useRouter } from "vue-router";
import router from "@/router";
import { useUserStore } from "@/store";
import useLoading from "@/hooks/loading";
import { FormInst, FormRules, FormItemRule } from "naive-ui";
import { useMessage } from "naive-ui";
import { User, Lock, Code, Refresh } from "@vicons/tabler";
import { LoginData } from "@/store/modules/user/types";

export default defineComponent({
  name: "LoginForm",
  components: {},
  mounted() {
    try {
    } catch (e) {
      this.message.error(`加载数据错误：${(e as Error).message}`);
    }
  },
  setup() {
    // const router = useRouter();
    const { loading, setLoading } = useLoading();
    const userStore = useUserStore();
    const message = useMessage();

    const userInfo = ref<LoginData>({
      account: "admin",
      password: "admin",
      rememberPassword: false,
    });

    // 用户信息
    const formRef = ref<FormInst | null>(null);
    const userRules: FormRules = {
      username: [
        {
          required: true,
          validator(rule: FormItemRule, value: string) {
            if (!value) {
              return new Error("请输入用户名");
            }
            return true;
          },
          trigger: ["input", "blur"],
        },
      ],
      password: [
        {
          required: true,
          validator(rule: FormItemRule, value: string) {
            if (!value) {
              return new Error("请输入密码");
            }
            return true;
          },
          trigger: ["input", "blur"],
        },
      ],
      code: [
        {
          required: true,
          validator(rule: FormItemRule, value: string) {
            if (!value) {
              return new Error("请输入验证码");
            }
            return true;
          },
          trigger: ["input", "blur"],
        },
      ],
    };

    // 记住密码
    const setRememberPassword = (value: boolean) => {
      userInfo.value.rememberPassword = value;
    };

    // 登录事件
    const handleSubmit = (e: MouseEvent) => {
      e.preventDefault();
      formRef.value?.validate(async (errors) => {
        if (!errors) {
          setLoading(true);
          // 登录
          await userStore.login(userInfo.value as LoginData);
          // 重定向到之前的页面
          const { redirect, ...othersQuery } = router.currentRoute.value.query;
          router.push({
            path: (redirect as string) || "/dashboard/workplace",
            query: {
              ...othersQuery,
            },
          });
          setLoading(false);
        } else {
          message.warning("输入错误");
        }
      });
    };

    return {
      formRef,
      message,
      loading,
      setLoading,
      userInfo,
      handleSubmit,
      setRememberPassword,
      userRules,
      User,
      Lock,
      Code,
      Refresh,
    };
  },
});
</script>

<style lang="less" scoped>
.login-form-wrapper {
  width: 320px;
  // margin-top: 24px;

  .login-form-title {
    color: var(--color-text-1);
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
  }

  .login-form-sub-title {
    margin: 12px 0;
    color: var(--color-text-3);
    font-size: 14px;
    line-height: 24px;
  }

  .login-action-container {
    button {
      display: flex;
      width: 100%;
    }

    .login-action-submit {
      :deep .n-button__icon {
        .n-base-loading {
          width: 14px;
          height: 14px;
        }
      }
    }
  }

  .login-form-password-actions {
    display: flex;
    justify-content: space-between;
  }

  .login-form-register-btn {
    color: var(--color-text-3) !important;
  }
}
</style>

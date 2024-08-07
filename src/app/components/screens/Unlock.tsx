import { FC, memo, useCallback } from "react";
import classNames from "clsx";
import { useAtomValue } from "jotai";
import { isPopup as isPopupPrimitive } from "lib/ext/view";

import { Page } from "app/nav";
import { currentProfileAtom } from "app/atoms";
import { openInTab } from "app/helpers";
import { ReactComponent as ChangeProfileIcon } from "app/icons/change-profile.svg";
import { ReactComponent as WigwamIcon } from "app/icons/nexis-logo.svg";

import BoardingPageLayout from "../layouts/BoardingPageLayout";
import PopupLayout from "../layouts/PopupLayout";
import ProfilePreview from "../blocks/ProfilePreview";
import PasswordForm from "../blocks/PasswordForm";
// import { EvervaultCard } from "../layouts/HoverEffect";

type UnlockProps = {
  isApproval?: boolean;
};

const Unlock: FC<UnlockProps> = ({ isApproval }) => {
  const currentProfile = useAtomValue(currentProfileAtom);

  const isPopup = isPopupPrimitive();

  const content = (
    <>
      <div className={classNames("flex justify-center", isPopup && "mt-8")}>
        <div className="relative">
          {!isApproval && (
            <ChangeProfileButton
              theme={isPopup ? "small" : "large"}
              className={classNames(
                "absolute top-1/2 -translate-y-1/2",
                isPopup
                  ? "right-[calc(100%+0.5rem)]"
                  : "right-[calc(100%+2.5rem)]",
              )}
            />
          )}
          {/* <div
            className={classNames(
              "not-prose block rounded-lg border border-[#ffffff]/10 bg-[#ffffff]/3 text-md text-card-foreground shadow-md transition-colors relative overflow-hidden hover:bg-accent/80 hover:before:absolute hover:before:inset-0 hover:before:content-[''] hover:before:rounded-[inherit] hover:before:bg-gradient-to-br hover:before:from-transparent hover:before:via-transparent hover:before:transition-opacity hover:before:duration-700 hover:before:opacity-0 hover:hover:before:opacity-100 group",
            )}
          > */}
          {/* <EvervaultCard
              alwaysDisplayOn={false}
              child={ */}
          <ProfilePreview
            theme={isPopup ? "extrasmall" : "large"}
            profile={currentProfile}
            className={classNames(isPopup ? "w-[8.25rem]" : "w-[16rem]")}
          />
          {/* }
              isHoverNeeded={true}
            /> */}
          {/* </div> */}
        </div>
      </div>
      <PasswordForm
        theme={isPopup ? "small" : "large"}
        className={isPopup ? "mt-11" : "mt-12"}
        attentionModal={!isApproval}
        autoFocus
      />
      {isPopup && (
        <div
          className={classNames(
            "fixed bottom-6 left-1/2 -translate-x-1/2",
            "bottom-4",
            "text-xl",
            "font-black",
            "flex items-center",
          )}
        >
          <WigwamIcon className={classNames("h-[1.375rem]", "w-auto mr-3")} />
        </div>
      )}
    </>
  );

  return isPopup ? (
    <PopupLayout>{content}</PopupLayout>
  ) : (
    <BoardingPageLayout header={!isApproval}>{content}</BoardingPageLayout>
  );
};

export default Unlock;

type ChangeProfileButtonProps = {
  theme?: "large" | "small";
  className?: string;
};

const ChangeProfileButton = memo<ChangeProfileButtonProps>(
  ({ theme = "large", className }) => {
    const handleClick = useCallback(() => {
      openInTab({ page: Page.Profiles });
    }, []);

    return (
      <button
        type="button"
        onClick={handleClick}
        className={classNames(
          "flex flex-col items-center",
          "box-border",
          theme === "large" && "w-40 px-3 py-11",
          theme === "small" && "w-[6.5rem] px-2 py-5",
          "rounded-[.625rem]",
          "transition-colors",
          "hover:bg-[#1b1d1f] focus-visible:bg-[#1b1d1f]",
          "active:bg-brand-main/[.05]",
          className,
        )}
      >
        <span
          className={classNames(
            "rounded-full",
            "flex items-center justify-center",
            "bg-[#1b1d1f]",
            theme === "large" && "w-16 h-16 mb-3",
            theme === "small" && "w-12 h-12 mb-1",
          )}
        >
          <ChangeProfileIcon
            className={classNames(
              theme === "large" && "w-6 h-6",
              theme === "small" && "w-[1.125rem] h-[1.125rem]",
            )}
          />
        </span>
        <span
          className={classNames(
            theme === "large" && "text-lg",
            theme === "small" && "text-xs",
            "font-bold text-brand-light",
          )}
        >
          Change profile
        </span>
      </button>
    );
  },
);

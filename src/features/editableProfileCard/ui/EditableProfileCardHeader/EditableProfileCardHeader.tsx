import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { classNames } from '@/shared/lib/classNames/classNames';

import { getUserAuthData } from '@/entities/User';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { NotificationButton } from '@/features/notificationButton';
import { smallerThanLg } from '@/shared/const/mediaQuery';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slice/profileSlice';
import cls from './EditableProfileCardHeader.module.scss';

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = memo(
    (props: EditableProfileCardHeaderProps) => {
        const { className } = props;

        const { t } = useTranslation('profile');
        const authData = useSelector(getUserAuthData);
        const profileData = useSelector(getProfileData);
        const canEdit = authData?.id === profileData?.id;
        const readonly = useSelector(getProfileReadonly);
        const dispatch = useAppDispatch();
        const isSmallerThanLg = useMediaQuery(smallerThanLg);

        const onEdit = useCallback(() => {
            dispatch(profileActions.setReadonly(false));
        }, [dispatch]);

        const onCancelEdit = useCallback(() => {
            dispatch(profileActions.cancelEdit());
        }, [dispatch]);

        const onSave = useCallback(() => {
            dispatch(updateProfileData());
        }, [dispatch]);

        return (
            <Card padding="24" fullWidth border="partial">
                <HStack
                    max
                    justify="between"
                    className={classNames(cls.EditableProfileCardHeader, {}, [className])}
                >
                    <Text title={t('profile_page')} />
                    <div className={cls.actions}>
                        {canEdit && (
                            <div>
                                {readonly ? (
                                    <Button
                                        onClick={onEdit}
                                        data-testid="EditableProfileCardHeader.EditButton"
                                    >
                                        {t('edit')}
                                    </Button>
                                ) : (
                                    <HStack gap="8">
                                        <Button
                                            onClick={onCancelEdit}
                                            data-testid="EditableProfileCardHeader.CancelButton"
                                            color="error"
                                        >
                                            {t('decline')}
                                        </Button>
                                        <Button
                                            onClick={onSave}
                                            data-testid="EditableProfileCardHeader.SaveButton"
                                            color="success"
                                        >
                                            {t('save')}
                                        </Button>
                                    </HStack>
                                )}
                            </div>
                        )}

                        {isSmallerThanLg &&
                        <div className={cls.avatarBlock}>
                            <NotificationButton />
                            <AvatarDropdown />
                        </div>}

                    </div>
                </HStack>
            </Card>
        );
    },
);

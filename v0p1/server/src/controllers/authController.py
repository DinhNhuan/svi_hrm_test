from src.common.utils import handle_log
class AuthController():
    def __init__(self,):
        pass

    def get_user_by_email(self, email):
        user_info = self.model.get_user_by_email(email)
        return user_info

    def save_refresh_token(self, user_id, refresh_token):
        try:
            self.model.save_refresh_token(user_id, refresh_token)
        except Exception as error:
            handle_log(error, 'error')

    def remove_refresh_token(self, user_id):
        try:
            self.model.remove_refresh_token(user_id)
        except Exception as error :
             handle_log(error, 'error')



import smtplib

from django.conf import settings


def send_email(recipient: str | list[str], author: str, text: str, subject: str) -> None:
    TO = recipient if isinstance(recipient, list) else [recipient]
    FROM = author
    message = """From: %s\nTo: %s\nSubject: %s\n\n%s
        """ % (FROM, ", ".join(TO), subject, text)
    server = smtplib.SMTP(settings.EMAIL_HOST, settings.EMAIL_PORT)
    server.ehlo()
    server.starttls()
    server.login(settings.EMAIL_HOST_USER, settings.EMAIL_HOST_PASSWORD)
    server.sendmail(FROM, TO, message)
    server.close()

import subprocess

from celery import shared_task


@shared_task
def flush_expired_tokens() -> None:
    subprocess.run(["python", "manage.py", "flushexpiredtokens"])
    print("Expired tokens deleted")

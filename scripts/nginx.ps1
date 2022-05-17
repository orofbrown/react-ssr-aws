param([String]$cmd="start")

if ($cmd -eq "stop") {
  nginx -c .\nginx.conf -e .\nginx\logs\error.log -s stop
} else {
  nginx -c .\nginx.conf -e .\nginx\logs\error.log
}
@echo off

ssh root@10.24.11.205 "rm -rf /root/wis-client/www_manager/*"

call npm run build:dev && scp -r ./dist/* root@10.24.11.205:/root/wis-client/www_manager/

if errorlevel 0 (

    echo 发布成功

    start http://10.24.11.205:8888/

)else (

    echo 发布失败

)

pause


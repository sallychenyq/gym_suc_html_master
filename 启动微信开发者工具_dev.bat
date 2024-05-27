@echo off

SET wx_cli=D:\APP\Tencent\WechatDevTool\cli.bat
SET wx_program=%cd%\dist/dev/mp-weixin

call %wx_cli% quit

choice /t 5 /d y /n >nul

call %wx_cli% open --project %wx_program%

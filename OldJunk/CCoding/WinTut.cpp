#ifndef _WINDOWS_		// if windows.h is not included...
#include <windows>		// include it!
#endif
#include "WinTut.h"	//include WinTut header file


WinTut::WinTut(HINSTANCE hIns)
{
	hInst = hIns;
	
	winTutWndCls.cbSize = sizeof(WNDCLASSEX);
	winTutWndCls.style = NULL;
	winTutWndCls.lpfnWndProc = WndProc;
	winTutWndCls.cbClsExtra = 0;
	winTutWndCls.cbWndExtra = 0;
	winTutWndCls.hInstance = hInst;
	winTutWndCls.hIcon = LoadIcon(NULL, IDI_APPLICATION);
	winTutWndCls.hCursor = LoadCursor(NULL, IDC_ARROW);
	winTutWndCls.hbrBackground = (HBRUSH)(COLOR_WINDOW);
	winTutWndCls.lpszMenuName = NULL;
	winTutWndCls.lpszClassName = "WinTutClass";
	winTutWndCls.hIconSm = LoadIcon(NULL, IDI_APPLICATION);
	
	if(!RegisterClassEx(&winTutWndCls))
	{
		MessageBox(NULL, "Grrr!\nCould not register window class!", "ERROR", MB_OK | MB_ICONERROR);
	}
	
	hWnd = CreateWindowEx(WS_EX_APPWINDOW, "WinTutClass", "WinTut!", WS_OVERLAPPEDWINDOW, 0, 0, 300, 400, NULL, NULL, hInst, NULL);
	
	if(hWnd == NULL)
	{
		MessageBox(NULL, "Could not create Window! :(", "ERROR", MB_OK | MB_ICONERROR);
	}
}

void WinTut::show(void)
{
	ShowWindow(hWnd, SW_SHOW);
}



int WINAPI WinMain(HINSTANCE hInst, HINSTANCE, LPSTR, int)
{

	MSG Msg;
	
	WinTut mainWindow(hInst);
	mainWindow.show();
	
	while(GetMessage(&Msg, NULL, 0, 0))
	{
		TranslateMessage(&Msg);
		DispatchMessage(&Msg);
	}
	return Msg.wParam;
	
}

LRESULT CALLBACK WndProc(HWND hWnd, UINT message, WPARAM wParam, LPARAM lParam)
{
   switch(message)
   {
   
      case WM_CLOSE:
      
         	DestroyWindow(hWnd);
         
      break;
      
      case WM_DESTROY:
      
         	PostQuitMessage(0);
      break;
      default:
         return DefWindowProc(hWnd, message, wParam, lParam);
   }
   return 0;
}
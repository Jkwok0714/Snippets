/** 				WinTut				**
 **	Creates a window from scratch using the Win32 API!	**
 **								**/


LRESULT CALLBACK WndProc(HWND hWnd, UINT msg, WPARAM wParam, LPARAM lParam);


// next we'll define the class that'll make our window:

class WinTut
{
	// private: 	These are the variables/functions 
	// 		that only this class can use!
	
	private:
		HINSTANCE hInst;
		WNDCLASSEX winTutWndCls;
		HWND hWnd;
	
	// public:	These are the variables/functions
	//		that all classes can use!
	
	public:
		WinTut(HINSTANCE hIns);			//a contstructor!
		void show(void);			//show the window!
};
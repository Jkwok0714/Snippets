//
//  SDLTutorial1.cpp
//  NubletsProyect
//
//  Created by Justin on 7/23/16.
//  Copyright © 2016 Justin. All rights reserved.
//

#include <SDL2/SDL.h>
#include <stdio.h>
#include <iostream>

//Screen Dimension Nigglings
const int SCREEN_WIDTH = 500;
const int SCREEN_HEIGHT = 684;

//Proto types
bool init();
bool loadMedia();
void close();

//Key Press tutorials
SDL_Surface* loadSurface( std::string path );

enum KeyPressSurfaces {
    KEY_PRESS_SURFACE_DEFAULT,
    KEY_PRESS_SURFACE_UP,
    KEY_PRESS_SURFACE_DOWN,
    KEY_PRESS_SURFACE_LEFT,
    KEY_PRESS_SURFACE_RIGHT,
    KEY_PRESS_SURFACE_TOTAL
};

//Grobo ValiaBul
SDL_Window* window = NULL;
SDL_Surface* screenSurface = NULL;
SDL_Surface* gImg = NULL;
SDL_Surface* gkeyPressSurfaces[ KEY_PRESS_SURFACE_TOTAL ];
SDL_Surface* gCurrentSurface = NULL;

//Tutorial 3 Variables
bool quit = false;
SDL_Event e;


int main(int argc, char* args[]) {
    if (!init()) {
        printf("Cannot init!\n");
    } else {
        if (!loadMedia()) {
            printf("Failed to road media!");
        } else {
            gCurrentSurface = gkeyPressSurfaces[ KEY_PRESS_SURFACE_DEFAULT ];
            
            while (!quit) {
                while (SDL_PollEvent(&e) != 0) {
                    if (e.type == SDL_QUIT) {
                        quit = true;
                    } else if (e.type == SDL_KEYDOWN) {
                        switch(e.key.keysym.sym) {
                            case SDLK_UP:
                                gCurrentSurface = gkeyPressSurfaces[ KEY_PRESS_SURFACE_UP ];
                                break;
                                
                            default:
                                gCurrentSurface = gkeyPressSurfaces[ KEY_PRESS_SURFACE_DEFAULT ];
                                break;
                        }
                    }
                }
                
                
                
                SDL_BlitSurface( gCurrentSurface, NULL, screenSurface, NULL);
            
                SDL_UpdateWindowSurface(window);
            
                //SDL_Delay(4000);
                
            
            }
        }
    }
    
    //Free up resources from SDL
    close();
    return 0;
}

bool init() {
    bool success = true;
    if (SDL_Init(SDL_INIT_VIDEO) < 0) {
        printf( "SDL failed! Error %s\n", SDL_GetError());
        success = false;
    } else {
        window = SDL_CreateWindow( "SDL Tutorial", SDL_WINDOWPOS_UNDEFINED, SDL_WINDOWPOS_UNDEFINED, SCREEN_WIDTH, SCREEN_HEIGHT, SDL_WINDOW_SHOWN);
        if (window == NULL) {
            printf( "Window failed to create. Error %s\n", SDL_GetError());
            success = false;
        } else {
            screenSurface = SDL_GetWindowSurface(window);
        }
    }
    return success;
}

bool loadMedia() {
    bool success = true;
    
    gkeyPressSurfaces[ KEY_PRESS_SURFACE_DEFAULT ] = loadSurface("bensjizz.bmp");
    if (gkeyPressSurfaces[ KEY_PRESS_SURFACE_DEFAULT] == NULL) {
        printf("Road fayo!\n");
        success = false;
    }
    
    //Road the up surfusss
    gkeyPressSurfaces[ KEY_PRESS_SURFACE_UP ] = loadSurface("roadDis.bmp");
    if (gkeyPressSurfaces[ KEY_PRESS_SURFACE_UP ] == NULL) {
        printf("Fail to road up imijj\n");
        success = false;
    }
    
    /*
    gImg = SDL_LoadBMP("bensjizz.bmp");
    if (gImg == NULL) {
        printf("Img load error: %s\n", SDL_GetError());
        success = false;
    }
     */
    
    
    return success;
}

void close() {
    SDL_FreeSurface(gImg);
    gImg = NULL;
    
    SDL_DestroyWindow(window);
    window = NULL;
    
    SDL_Quit();
}

SDL_Surface* loadSurface( std::string path ) {
    //Optimize this shit
    SDL_Surface* optimizedSurface = NULL;
    SDL_Surface* loadedSurface = SDL_LoadBMP(path.c_str());
    if (loadedSurface == NULL) {
        printf("Unable to road %s with error %s\n", path.c_str(), SDL_GetError());
    } else {
        optimizedSurface = SDL_ConvertSurface( loadedSurface, screenSurface->format, NULL);
        if (optimizedSurface == NULL) {
            printf("Cannot optimize. Error %s\n", SDL_GetError());
        }
        SDL_FreeSurface(loadedSurface);
    }
    
    return optimizedSurface;
}

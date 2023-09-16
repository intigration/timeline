%

% Author: muhammad farhan
%
%==================================================================>>>>>>>> BASE <<<<<<=====================================================

\ProvidesClass{mfarhan-cv}[2023/07/27  v1.9.2 'mfarhancv' Class]
\RequirePackage[utf8]{luainputenc}
\RequirePackage{url,parskip} 
\LoadClass[a4paper]{article}
% \documentclass[alternative]{mfarhan-cv}

\usepackage{graphicx}
\usepackage{wrapfig}

% \ProvidesClass{mfarhan-cv}[2023/07/27  v1.9.2 'mfarhancv' Class]

\RequirePackage[usenames,dvipsnames]{xcolor}
\RequirePackage{tikz}
\RequirePackage{qrcode}
\usepackage{multirow}
\usepackage{pgfplots}
\pgfplotsset{width=10cm,compat=1.9}
\RequirePackage[margin=1.5cm]{geometry}
%we use utf8 since we want to build from any machine
\usepackage[utf8]{inputenc}		

% projects technologies
%============================================================================%
%
%	DOCUMENT DEFINITION

% \ProvidesClass{twentysecondcv}[2015/02/28 CV class]
% \LoadClass{article}
% \NeedsTeXFormat{LaTeX2e}

%----------------------------------------------------------------------------------------
%	 REQUIRED PACKAGES
%-----------------------------------------------------------------------	-----------------

% \usepackage[a4paper]{geometry}		
% for example, change the margins to 2 inches all round
\geometry{top=1.75cm, bottom=-1.0cm, left=1.5cm, right=1.5cm} 	

%use customized header
% \usepackage{fancyhdr}				
% \pagestyle{fancy}

\RequirePackage[quiet]{fontspec}
\RequirePackage[sfdefault]{ClearSans}

\def\arrow#1{\pspicture[shift=2pt](#1,0)\psline{->}(#1,0)\endpspicture}

\usepackage{pstricks}
\usepackage{tabularx}
\usepackage{fontawesome}
\RequirePackage{tikz}
\RequirePackage{fullpage}
\RequirePackage{xcolor}
\RequirePackage[absolute,overlay]{textpos}
\RequirePackage{ragged2e}
\RequirePackage{etoolbox}
\RequirePackage{ifmtarg}
\RequirePackage{ifthen}
\RequirePackage{pgffor}
\RequirePackage{marvosym}
\RequirePackage{parskip}

\usepackage{enumitem}
\setlist[itemize]{leftmargin=*}

\RequirePackage[hidelinks]{hyperref}
\hypersetup{
    pdftitle={MuhammadFarhan-CV},
    pdfauthor={engr.farhan@icloud.com},
    pdfsubject={Muhammad Farhan Key Technology Expert},
    pdfkeywords={},
    colorlinks=true,           % no lik border color
    allbordercolors=white       % white border color for all
}

\DeclareOption*{\PassOptionsToClass{\CurrentOption}{article}}
\ProcessOptions\relax

%----------------------------------------------------------------------------------------
%	 DEFINING COLOURS
%----------------------------------------------------------------------------------------

\definecolor{white}{RGB}{255,255,255}
\definecolor{gray}{HTML}{4D4D4D}
\definecolor{sidecolor}{HTML}{E7E7E7}
\definecolor{mainblue}{HTML}{0E5484}
\definecolor{maingray}{HTML}{B9B9B9}
\definecolor{mainpurple}{HTML}{884EA0}
\definecolor{maingray}{HTML}{85929E}

\definecolor{pblue}{HTML}{0395DE}

\definecolor{darkgray}{HTML}{333333}
\definecolor{gray}{HTML}{4D4D4D}
\definecolor{lightgray}{HTML}{999999}
\definecolor{green}{HTML}{C2E15F}
\definecolor{orange}{HTML}{FDA333}
\definecolor{purple}{HTML}{D3A4F9}
\definecolor{red}{HTML}{FB4485}
\definecolor{blue}{HTML}{6CE0F1}
\definecolor{pblue}{HTML}{0395DE}
\definecolor{materialpurple}{HTML}{9C27B0}
\definecolor{materialindigo}{HTML}{3F51B5}
\definecolor{materialblue}{HTML}{2196F3}
\definecolor{materialcyan}{HTML}{00BCD4}
\definecolor{materialteal}{HTML}{009688}
\definecolor{materialgreen}{HTML}{4CAF50}
\definecolor{materiallime}{HTML}{CDDC39}
\definecolor{materialamber}{HTML}{FFC107}
\definecolor{materialbrown}{HTML}{795548}
\definecolor{materialred}{HTML}{FF4436}
\definecolor{materialorange}{HTML}{FF5722}
\definecolor{linkedin}{HTML}{0085AE}
\definecolor{test}{HTML}{0077be}
\definecolor{yt}{HTML}{c71610}

\ifdefined\@cv@print
  \colorlet{green}{gray}
  \colorlet{orange}{gray}
  \colorlet{purple}{gray}
  \colorlet{red}{gray}
  \colorlet{blue}{gray}
  \colorlet{fillheader}{white}
  \colorlet{header}{gray}
\else
  \colorlet{fillheader}{white}
  \colorlet{header}{gray}
\fi
\colorlet{textcolor}{gray}
\colorlet{headercolor}{gray}


\pagestyle{empty} % Disable headers and footers

\setlength{\parindent}{0pt} % Disable paragraph indentation

% --------------------------------------------------------------------------------------
% 	FONTS
%-------------------------------------------------------------------------------------
\newfontfamily\headingfont[Path = ]{segoeuib.ttf}

%----------------------------------------------------------------------------------------
%	 SIDEBAR DEFINITIONS
%----------------------------------------------------------------------------------------

\setlength{\TPHorizModule}{1cm} % Left margin
\setlength{\TPVertModule}{1cm} % Top margin

% \newlength\imagewidth
% \newlength\imagescale
% \pgfmathsetlength{\imagewidth}{5cm}
% \pgfmathsetlength{\imagescale}{\imagewidth/600}

\newcommand{\profilesection}[2]{\vspace{8pt}{\color{headercolor} \huge #1 \rule[0.15\baselineskip]{#2}{1pt}}}

% Define custom commands for CV info
\newcommand{\cvdate}[1]{\renewcommand{\cvdate}{#1}}
\newcommand{\cvlinkedin}[1]{\renewcommand{\cvlinkedin}{#1}}
\newcommand{\cvgithub}[1]{\renewcommand{\cvgithub}{#1}}
\newcommand{\cvmail}[1]{\renewcommand{\cvmail}{#1}}
\newcommand{\cvnumberphone}[1]{\renewcommand{\cvnumberphone}{#1}}
\newcommand{\cvaddress}[1]{\renewcommand{\cvaddress}{#1}}
\newcommand{\cvsite}[1]{\renewcommand{\cvsite}{#1}}
\newcommand{\cvwebsite}[1]{\renewcommand{\cvwebsite}{#1}}
\newcommand{\aboutme}[1]{\renewcommand{\givenaboutme}{  \justifying#1}} % about me
%New------------------------------------------------
\newcommand{\profilepic}[1]{\renewcommand{\profilepic}{#1}}
%New------------------------------------------------
\newcommand{\cvname}[1]{\renewcommand{\cvname}{#1}}
%New Surname
\newcommand{\cvsurname}[1]{\renewcommand{\cvsurname}{#1}}
\newcommand{\cvjobtitle}[1]{\renewcommand{\cvjobtitle}{#1}}

\newcommand{\givenaboutme}{}         % about me


% Command for printing the contact information icons
\newcommand*\icon[1]{\tikz[baseline=(char.base)]{\node[shape=circle,draw,inner sep=1pt, fill=mainpurple,mainpurple,text=white] (char) {#1};}}

% Command for printing skill progress bars
\newcommand\programming[1]{ 
	\renewcommand{\programming}{
		\begin{tikzpicture}
			\foreach [count=\i] \x/\y in {#1}{
				\draw[fill=maingray,maingray] (0,\i) rectangle (6,\i+0.4);
				\draw[fill=white,mainpurple](0,\i) rectangle (\y,\i+0.4);
				\node [above right] at (0,\i+0.35) {\x};
			}
		\end{tikzpicture}
	}
}

\newcommand\programminglanguage[1]{ 
	\renewcommand{\programminglanguage}{
		\begin{tikzpicture}
		\foreach [count=\i] \x/\y in {#1}{
			\draw[fill=maingray,maingray] (0,\i) rectangle (6,\i+0.4);
			\draw[fill=white,magenta](0,\i) rectangle (\y,\i+0.4);
			\node [above right] at (0,\i+0.35) {\x};
		}
		\end{tikzpicture}
	}
}

\newcommand\languages[1]{ 
	\renewcommand{\languages}{
		{#1}
	}
}

%----------------------------------------------------------------------------------------
%  SIDEBAR LAYOUT
%----------------------------------------------------------------------------------------

\newcommand{\makeprofile}{
	\begin{tikzpicture}[remember picture,overlay]
	\node [rectangle, fill=sidecolor, anchor=north, minimum width=9.2cm, minimum height=\paperheight+1cm] (box) at (-5cm,0.5cm){};
	\end{tikzpicture}
	
	%------------------------------------------------
	
	\begin{textblock}{6}(0.55, 0.2)
		%Yeni------------------------------------------------
		\begin{tikzpicture}[x=\imagescale,y=-\imagescale]
		\clip (600/2, 567/2) circle (567/2);
		
		\node[anchor=north west, inner sep=0pt, outer sep=0pt] at (0,0) {\includegraphics[width=\imagewidth]{\profilepic}};
		\end{tikzpicture}
		%Yeni------------------------------------------------
		%------------------------------------------------
		
		\vspace{2mm}
		{\Huge\color{mainpurple}\hspace{5mm}\cvname}
		\vspace{1mm}
		{\Huge\color{mainpurple}\hspace{5mm}\cvsurname}
		
		\vspace{1mm}
		
		%------------------------------------------------
		
		{\Large\color{headercolor}\hspace{0.1mm}\cvjobtitle}
		
		\vspace{0.5cm}
		%------------------------------------------------
		
		\renewcommand{\arraystretch}{2}
		\begin{tabular}{p{0.4cm} @{\hskip 0.5cm}p{20cm}}
      \ifthenelse{\equal{\cvnumberphone}{}}{}{
      		{$
              \begin{array}{l}
              \hspace{-2.2mm} \Huge \textnormal{\faMobilePhone} 
              \end{array}
              $} 
            & \cvnumberphone\\}
            
      \ifthenelse{\equal{\cvsite}{}}{}{
            {$
              \begin{array}{l}
              \hspace{-2.5mm} \huge \textnormal{\textcolor{test}{\faGlobe}}
              \end{array}
              $}
            & \cvsite\\}
            %& \href{http://\cvsite}{\cvsite} \\}
      \ifthenelse{\equal{\cvwebsite}{}}{}{
            {$
              \begin{array}{l}
              \hspace{-2.5mm} \huge \textnormal{\textcolor{test}{\faInternetExplorer}}
              \end{array}
              $}
            % fo
            & \href{https://\cvwebsite}{\cvwebsite} \\}
      \ifthenelse{\equal{\cvmail}{}}{}{
            {$
              \begin{array}{l}
              \hspace{-3.0mm} \huge \textnormal{\textcolor{yt}{\faEnvelopeO}}
              \end{array}
              $} 
            & \href{mailto:\cvmail}{\cvmail} \\}
      
       \ifthenelse{\equal{\cvlinkedin}{}}{}{
            {$
              \begin{array}{l}
              \hspace{-3.0mm} \huge \textnormal{\textcolor{linkedin}{\faLinkedinSquare}}
              \end{array}
              $} & \href{https://www.linkedin.com/in/\cvlinkedin/}{\cvlinkedin} \\
            }
        \ifthenelse{\equal{\cvgithub}{}}{}{
		{$
		\begin{array}{l}
		\hspace{-3.0mm} \huge \textnormal{\faGithub}
		\end{array}
		$} & \href{https://www.github.com/\cvgithub}{\cvgithub} \\
		}   
    \end{tabular}
    
    
    \vspace{0.5cm}
    
    % about me text
    \profilesection{\color{headercolor}\hspace{5mm}About me}{0.0cm}
    
    \vspace{1.0mm}
    
    \givenaboutme

    %------------------------------------------------
    \vspace{0.2mm}
    
    \profilesection{\color{headercolor}Capabilities}{0.0cm}

	\hspace{-5mm}\yetenek
        
        ------------------------------------------------
        
        \vspace{2mm}
       
	 {\large \textbf{\color{headercolor}Programming Skills}} 

		 \programming
		 
		 \vspace{2mm}
		 
	 {\large \textbf{\color{headercolor}Languages}}
	 
	  	\programminglanguage
	  	
	  	
        \profilesection{Languages}{0.0cm} 
        
        \languages
  \end{textblock}
}


%----------------------------------------------------------------------------------------
%	 COLOURED SECTION TITLE BOX
%----------------------------------------------------------------------------------------

% Command to create the rounded boxes around the first three letters of section titles
\newcommand*\round[2]{%
	\tikz[baseline=(char.base)]\node[anchor=north west, draw,rectangle, rounded corners, inner sep=1.6pt, minimum size=5.5mm, text height=3.6mm, fill=#2,#2,text=white](char){#1};%
}

\def\@sectioncolor#1#2#3{%
	{%
		\color{mainpurple} #1#2#3%
	}%
}


\renewcommand{\section}[1]{
  \par\vspace{\parskip}
	{%
		\LARGE\headingfont\color{headercolor}%
		\@sectioncolor #1%
	}
  \par\vspace{\parskip}
}

\renewcommand{\subsection}[1]{
	\par\vspace{.5\parskip}{%
		\Large\headingfont\color{headercolor} #1%
	}
	\par\vspace{.25\parskip}%
}

\pagestyle{empty}

\setlength{\tabcolsep}{0pt}

% New environment for the long list
\newenvironment{twenty}{%
	\begin{tabular*}{\textwidth}{@{\extracolsep{\fill}}ll}
}{%
	\end{tabular*}
}

\newcommand{\twentyitem}[6]{%
	#1&\parbox[t]{0.83\textwidth}{%
		\textbf{#3}% 
		\hfill%
		{\footnotesize#4}%
        }\\%
    #2&\parbox[t]{0.83\textwidth}{%
		\ifblank{#5}{}{#5 \\}
		#6%
	}\\
}

\setlength{\tabcolsep}{0pt}

% New environment for the small list
\newenvironment{twentyshort}{%
	\begin{tabular*}{\textwidth}{@{\extracolsep{\fill}}ll}
}{%
	\end{tabular*}
}

\newcommand{\twentyitemshort}[2]{%
	#1&\parbox[t]{0.83\textwidth}{%
		#2%
	}\\
}


% \RequirePackage[left=7.6cm,top=0.1cm,right=1cm,bottom=0.1cm,nohead,nofoot]{geometry}
\usepackage{smartdiagram}
\smartdiagramset{
    bubble center node font = \footnotesize,
    bubble node font = \footnotesize,
    % specifies the minimum size of the bubble center node
    bubble center node size = 0.5cm,
    %  specifies the minimum size of the bubbles
    bubble node size = 0.5cm,
    % specifies which is the distance among the bubble center node and the other bubbles
    distance center/other bubbles = 0.3cm,
    % sets the distance from the text to the border of the bubble center node
    distance text center bubble = 0.5cm,
    % set center bubble color
    bubble center node color = pblue,
    % define the list of colors usable in the diagram
    set color list = {lightgray, materialcyan, orange, green, materialorange, materialteal, materialamber, materialindigo, materialgreen, materiallime},
    % sets the opacity at which the bubbles are shown
    bubble fill opacity = 0.6,
    % sets the opacity at which the bubble text is shown
    bubble text opacity = 1,
}
% \usecases{
%     bubble center node font = \footnotesize,
%     bubble node font = \footnotesize,
%     % specifies the minimum size of the bubble center node
%     bubble center node size = 0.5cm,
%     %  specifies the minimum size of the bubbles
%     bubble node size = 0.5cm,
%     % specifies which is the distance among the bubble center node and the other bubbles
%     distance center/other bubbles = 0.3cm,
%     % sets the distance from the text to the border of the bubble center node
%     distance text center bubble = 0.5cm,
%     % set center bubble color
%     bubble center node color = pblue,
%     % define the list of colors usable in the diagram
%     set color list = {lightgray, materialcyan, orange, green, materialorange, materialteal, materialamber, materialindigo, materialgreen, materiallime},
%     % sets the opacity at which the bubbles are shown
%     bubble fill opacity = 0.6,
%     % sets the opacity at which the bubble text is shown
%     bubble text opacity = 1,
% }


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


\newcommand{\grafico}[1]{\renewcommand{\grafico}{#1}}
\newcommand{\supporti}[1]{\renewcommand{\supporti}{#1}}
\newcommand{\settori}[1]{\renewcommand{\settori}{#1}}
\newcommand{\testo}[1]{\renewcommand{\testo}{#1}}


%%% Second page sidebar


\newcommand{\makeseconda}{

\begin{tikzpicture}[remember picture,overlay]
    \node [rectangle, fill=sidecolor, anchor=north, minimum width=9.2cm, minimum height=\paperheight+1cm] (box) at (-5cm,0.5cm){};
\end{tikzpicture}

%------------------------------------------------

\begin{textblock}{6}(0.55, 0.2)
			
		%------------------------------------------------

\vspace{0.7cm}

\profilesection{\color{headercolor}ML Libraries}{0.0cm}

\mllibs

\vspace{0.7cm}

{\large \textbf{\color{headercolor}Programming Skills}}

\programming

\vspace{0.7cm}

\profilesection{\color{headercolor}Python Libraries}{0.0cm}

\pythonlibs

\vspace{0.7cm}

{\large \textbf{\color{headercolor}Languages}}

\programminglanguage

\vspace{0.7cm}

% \profilesection{\color{headercolor}Hobies}{0.0cm}

% \hobies



\renewcommand{\arraystretch}{1.6}


\end{textblock}
}

%
%============================================================================%
% Dependences
%A Few Useful Packages
% beautify:

% \usepackage{graphicx}
% \usepackage{wrapfig}

% % \ProvidesClass{mfarhan-cv}[2023/07/27  v1.9.2 'mfarhancv' Class]
% \RequirePackage[utf8]{luainputenc}
% \RequirePackage{url,parskip} 
% \RequirePackage[usenames,dvipsnames]{xcolor}
% \RequirePackage{tikz}
% \RequirePackage{qrcode}
% \usepackage{multirow}
% \usepackage{pgfplots}
% \pgfplotsset{width=10cm,compat=1.9}
% \RequirePackage[margin=1.5cm]{geometry}
% %we use utf8 since we want to build from any machine
\usepackage[utf8]{inputenc}		


\newlength\imagewidth
\newlength\imagescale
\pgfmathsetlength{\imagewidth}{5cm}
\pgfmathsetlength{\imagescale}{\imagewidth/600}




% Command for printing the contact information icons
\newcommand*\icon[1]{\tikz[baseline=(char.base)]{\node[shape=circle,draw,inner sep=1pt, fill=mainpurple,mainpurple,text=white] (char) {#1};}}

% Command for printing skill progress bars
\newcommand\programming[1]{ 
	\renewcommand{\programming}{
		\begin{tikzpicture}
			\foreach [count=\i] \x/\y in {#1}{
				\draw[fill=maingray,maingray] (0,\i) rectangle (6,\i+0.4);
				\draw[fill=white,mainpurple](0,\i) rectangle (\y,\i+0.4);
				\node [above right] at (0,\i+0.35) {\x};
			}
		\end{tikzpicture}
	}
}

\newcommand\programminglanguage[1]{ 
	\renewcommand{\programminglanguage}{
		\begin{tikzpicture}
		\foreach [count=\i] \x/\y in {#1}{
			\draw[fill=maingray,maingray] (0,\i) rectangle (6,\i+0.4);
			\draw[fill=white,mainpurple](0,\i) rectangle (\y,\i+0.4);
			\node [above right] at (0,\i+0.35) {\x};
		}
		\end{tikzpicture}
	}
}

\newcommand\languages[1]{ 
	\renewcommand{\languages}{
		{#1}
	}
}

%----------------------------------------------------------------------------------------
%  SIDEBAR LAYOUT
%----------------------------------------------------------------------------------------

\newcommand{\makeprofile}{
	\begin{tikzpicture}[remember picture,overlay]
	\node [rectangle, fill=sidecolor, anchor=north, minimum width=9.2cm, minimum height=\paperheight+1cm] (box) at (-5cm,0.5cm){};
	\end{tikzpicture}
	
	%------------------------------------------------
	
	\begin{textblock}{6}(0.55, 0.2)
		%Yeni------------------------------------------------
		\begin{tikzpicture}[x=\imagescale,y=-\imagescale]
		\clip (600/2, 567/2) circle (567/2);
		
		\node[anchor=north west, inner sep=0pt, outer sep=0pt] at (0,0) {\includegraphics[width=\imagewidth]{\profilepic}};
		\end{tikzpicture}
		%Yeni------------------------------------------------
		%------------------------------------------------
		
		\vspace{2mm}
		{\Huge\color{mainpurple}\hspace{5mm}\cvname}
		\vspace{1mm}
		{\Huge\color{mainpurple}\hspace{5mm}\cvsurname}
		
		\vspace{1mm}
		
		%------------------------------------------------
		
		{\Large\color{headercolor}\hspace{0.1mm}\cvjobtitle}
		
		\vspace{0.5cm}
		%------------------------------------------------
		
		\renewcommand{\arraystretch}{2}
		\begin{tabular}{p{0.4cm} @{\hskip 0.5cm}p{20cm}}
      \ifthenelse{\equal{\cvnumberphone}{}}{}{
      		{$
              \begin{array}{l}
              \hspace{-2.2mm} \Huge \textnormal{\faMobilePhone} 
              \end{array}
              $} 
            & \cvnumberphone\\}
            
      \ifthenelse{\equal{\cvsite}{}}{}{
            {$
              \begin{array}{l}
              \hspace{-2.5mm} \huge \textnormal{\textcolor{test}{\faGlobe}}
              \end{array}
              $}
            & \cvsite\\}
            %& \href{http://\cvsite}{\cvsite} \\}
      \ifthenelse{\equal{\cvwebsite}{}}{}{
            {$
              \begin{array}{l}
              \hspace{-2.5mm} \huge \textnormal{\textcolor{test}{\faInternetExplorer}}
              \end{array}
              $}
            % fo
            & \href{https://\cvwebsite}{\cvwebsite} \\}
      \ifthenelse{\equal{\cvmail}{}}{}{
            {$
              \begin{array}{l}
              \hspace{-3.0mm} \huge \textnormal{\textcolor{yt}{\faEnvelopeO}}
              \end{array}
              $} 
            & \href{mailto:\cvmail}{\cvmail} \\}
      
       \ifthenelse{\equal{\cvlinkedin}{}}{}{
            {$
              \begin{array}{l}
              \hspace{-3.0mm} \huge \textnormal{\textcolor{linkedin}{\faLinkedinSquare}}
              \end{array}
              $} & \href{https://www.linkedin.com/in/\cvlinkedin/}{\cvlinkedin} \\
            }
        \ifthenelse{\equal{\cvgithub}{}}{}{
		{$
		\begin{array}{l}
		\hspace{-3.0mm} \huge \textnormal{\faGithub}
		\end{array}
		$} & \href{https://www.github.com/\cvgithub}{\cvgithub} \\
		}   
    \end{tabular}
    
    
    \vspace{0.5cm}
    
    % about me text
    \profilesection{\color{headercolor}\hspace{5mm}About me}{0.0cm}
    
    \vspace{1.0mm}
    
    \givenaboutme

    %------------------------------------------------
    \vspace{0.2mm}
    
    \profilesection{\color{headercolor}Capabilities}{0.0cm}

	\hspace{-5mm}\yetenek
        
        ------------------------------------------------
        
        \vspace{2mm}
       
	 {\large \textbf{\color{headercolor}Programming Skills}} 

		 \programming
		 
		 \vspace{2mm}
		 
	 {\large \textbf{\color{headercolor}Languages}}
	 
	  	\programminglanguage
	  	
	  	
        \profilesection{Languages}{0.0cm} 
        
        \languages
  \end{textblock}
}


%----------------------------------------------------------------------------------------
%	 COLOURED SECTION TITLE BOX
%----------------------------------------------------------------------------------------

% % Command to create the rounded boxes around the first three letters of section titles
\newcommand*\round[2]{%
	\tikz[baseline=(char.base)]\node[anchor=north west, draw,rectangle, rounded corners, inner sep=1.6pt, minimum size=5.5mm, text height=3.6mm, fill=#2,#2,text=white](char){#1};%
}

\def\@sectioncolor#1#2#3{%
	{%
		\color{mainpurple} #1#2#3%
	}%
}


\renewcommand{\section}[1]{
  \par\vspace{\parskip}
	{%
		\LARGE\headingfont\color{headercolor}%
		\@sectioncolor #1%
	}
  \par\vspace{\parskip}
}

\renewcommand{\subsection}[1]{
	\par\vspace{.5\parskip}{%
		\Large\headingfont\color{headercolor} #1%
	}
	\par\vspace{.25\parskip}%
}

\pagestyle{empty}

\setlength{\tabcolsep}{0pt}

% New environment for the long list
\newenvironment{twenty}{%
	\begin{tabular*}{\textwidth}{@{\extracolsep{\fill}}ll}
}{%
	\end{tabular*}
}

\newcommand{\twentyitem}[6]{%
	#1&\parbox[t]{0.83\textwidth}{%
		\textbf{#3}% 
		\hfill%
		{\footnotesize#4}%
        }\\%
    #2&\parbox[t]{0.83\textwidth}{%
		\ifblank{#5}{}{#5 \\}
		#6%
	}\\
}

\setlength{\tabcolsep}{0pt}

% New environment for the small list
\newenvironment{twentyshort}{%
	\begin{tabular*}{\textwidth}{@{\extracolsep{\fill}}ll}
}{%
	\end{tabular*}
}

\newcommand{\twentyitemshort}[2]{%
	#1&\parbox[t]{0.83\textwidth}{%
		#2%
	}\\
}


\RequirePackage[left=7.6cm,top=0.1cm,right=1cm,bottom=0.1cm,nohead,nofoot]{geometry}



%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


\newcommand{\grafico}[1]{\renewcommand{\grafico}{#1}}
\newcommand{\supporti}[1]{\renewcommand{\supporti}{#1}}
\newcommand{\settori}[1]{\renewcommand{\settori}{#1}}
\newcommand{\testo}[1]{\renewcommand{\testo}{#1}}


%% Second page sidebar


\newcommand{\makeseconda}{

\begin{tikzpicture}[remember picture,overlay]
    \node [rectangle, fill=sidecolor, anchor=north, minimum width=9.2cm, minimum height=\paperheight+1cm] (box) at (-5cm,0.5cm){};
\end{tikzpicture}

%------------------------------------------------

\begin{textblock}{6}(0.55, 0.2)
			
		%------------------------------------------------

\vspace{0.7cm}

\profilesection{\color{headercolor}ML Libraries}{0.0cm}

\mllibs

\vspace{0.7cm}

{\large \textbf{\color{headercolor}Programming Skills}}

\programming

\vspace{0.7cm}

\profilesection{\color{headercolor}Python Libraries}{0.0cm}

\pythonlibs

\vspace{0.7cm}

{\large \textbf{\color{headercolor}Languages}}

\programminglanguage

\vspace{0.7cm}

% \profilesection{\color{headercolor}Hobies}{0.0cm}

% \hobies



\renewcommand{\arraystretch}{1.6}


\end{textblock}
}

%----------------------------------------------------------------------------------------
%	FOR LOGIC TESTING


% -----------------------------------------

%----------------------------------------------------------------------------------------

\usepackage{xifthen}
\usepackage{calc}

% for drawing graphics and charts
\usetikzlibrary{shapes, backgrounds}
\RequirePackage{hyperref}
\RequirePackage{titlesec}
\RequirePackage{array}
\RequirePackage{enumitem}
\RequirePackage{longtable} 	
\RequirePackage{etoolbox}
\RequirePackage{tikz}

\RequirePackage[skins]{tcolorbox}
\RequirePackage{fancyhdr}

\usepackage{fontspec}
\newfontfamily\emojifont[Renderer=Harfbuzz,SizeFeatures={Size=6}]{NotoColorEmoji.ttf}

\usepackage{amssymb}% to access $\blacksquare$
\newfontfamily\headingfont[Path = ]{segoeuib.ttf}
\usetikzlibrary{positioning}
\RequirePackage{lmodern,microtype,calligra}
\RequirePackage{enumitem,graphicx,environ,ragged2e}

% set font default
\renewcommand*\familydefault{\sfdefault} 	
\usepackage[T1]{fontenc}

% more font size definitions
\usepackage{moresize}		

% awesome font
\usepackage{fontawesome5}
\usepackage{xcolor}

%defineColors
% \definecolor{transparent}{HTML}
\definecolor{pyblue}{HTML}{306998}

% \definecolor{pyellow}{HTML}{FFE873}
\definecolor{pyellow}{HTML}{FFD43B}

\definecolor{pygray}{HTML}{646464}

\definecolor{sorange}{RGB}{255,150,0}
\definecolor{lblue}{RGB}{0,178,255}
\definecolor{darkblue}{RGB}{0,80,130}
\definecolor{darkerblue}{RGB}{0,100,160}
\definecolor{lgray}{RGB}{0,120,200}
\definecolor{powderblue}{RGB}{190,220,255}
\definecolor{darkestblue}{RGB}{0,50,80}


%main color
\colorlet{maincol}{pyellow}

%secondary colors
%\colorlet{secondcol}{lblue}
\colorlet{secondcol}{pygray}
\colorlet{thirdcol}{darkblue}
\colorlet{fourthcol}{pyblue}
\colorlet{fifthcol}{lgray}
\colorlet{sixthcol}{darkblue}

%background color
\colorlet{bgcol}{white}

%textcolor
\colorlet{textcol}{darkestblue}

%titletextcolor
\colorlet{titletext}{white}

%sectioncolor
\colorlet{sectcol}{white}

%set a background col for whole page
\pagecolor{bgcol}
	    
%we use article class because we want to fully customize the page

% \setlength{\arrayrulewidth}{0.5mm}
\setlength{\tabcolsep}{18pt}
\renewcommand{\arraystretch}{1.5}
%----------------------------------------------------------------------------------------
%	ENCODING
%----------------------------------------------------------------------------------------



%----------------------------------------------------------------------------------------
%	FONT
%----------------------------------------------------------------------------------------

% some tex-live fonts - choose your own

% \usepackage[defaultsans]{droidsans}
% \usepackage[default]{comfortaa}
% \usepackage{cmbright}
% \usepackage[default]{raleway}
%\usepackage{fetamont}
%\usepackage[default]{gillius}
%\usepackage[light,math]{iwona}
\usepackage[thin]{roboto} 
\usepackage{hyperref}
\hypersetup{
    colorlinks=true,
    linkcolor=blue,
    filecolor=magenta,      
    urlcolor=cyan,
}



%----------------------------------------------------------------------------------------
%	PAGE LAYOUT  DEFINITIONS
%----------------------------------------------------------------------------------------

%debug page outer frames
% \usepackage{showframe}			

% %define page styles using geometry
% \usepackage[a4paper]{geometry}		
% % for example, change the margins to 2 inches all round
\geometry{top=1cm, bottom=1cm, left=1cm, right=1cm} 	

% use customized header
\usepackage{fancyhdr}				
\pagestyle{fancy}

%less space between header and content
\setlength{\headheight}{-5pt}		

% customize header entries
\lhead{}
\rhead{}
\chead{}

%indentation is zero
\setlength{\parindent}{0mm}

%----------------------------------------------------------------------------------------
%	TABLE /ARRAY DEFINITIONS
%---------------------------------------------------------------------------------------- 

%extended aligning of tabular cells
\usepackage{array}

% custom column width
\newcolumntype{x}[1]{%
{\raggedleft\hspace{0pt}}p{#1}}%


%----------------------------------------------------------------------------------------
%	GRAPHICS DEFINITIONS
%---------------------------------------------------------------------------------------- 



\newif\if@showLinks   \@showLinksfalse

\DeclareOption{green}{
  \def\@green{green}
}

\DeclareOption{red}{
  \def\@red{red}
}

\DeclareOption{indigo}{
  \def\@indigo{indigo}
}
\DeclareOption{orange}{
  \def\@orange{orange}
}

\DeclareOption{monochrome}{
  \def\@monochrome{monochrome}
}

\DeclareOption{localFont}{
  \def\@local{local}
}

\DeclareOption{alternative}{
  \def\@alternative{alternate}
}


% \usetikzlibrary{positioning}


\DeclareOption{showLinks}{ \@showLinkstrue}

\ProcessOptions

% other packages for formatting

\DeclareUnicodeCharacter{00E9}{\'{e}}
% Define default accent colors
\definecolor{basecolor}{HTML}{000555}       %BLUE

\ifundef{\@green} {
  \ifundef{\@red} {
    \ifundef{\@indigo}{
      \ifundef{\@orange} {
        \ifundef{\@monochrome} {}
        { \definecolor{basecolor}{HTML}{blue}}
      }
      { \definecolor{basecolor}{HTML}{e68a00} }
    }
    { \definecolor{basecolor}{rgb}{0.2, 0.07, 0.48} }
  }
  { \definecolor{basecolor}{HTML}{b30000} }     %RED
}
{ \definecolor{basecolor}{rgb}{0.0, 0.62, 0.38} }

\definecolor{darkGrey}{HTML}{989898}

\colorlet{linkcolor}{basecolor}
\colorlet{accentcolor}{linkcolor!90}
\colorlet{symbolcolor}{linkcolor!85}

% \color{blue}

% \linespread{1.5}%\selectfont
 
% Without \selectfont the following paragraph lines are 
% unaffected affected by \linespread{2.5}: 


% Setup hyperref package, and colours for links
\definecolor{linkcolour}{rgb}{0,0.2,0.6}

\if@showLinks
  \hypersetup{%
    breaklinks
  }%
\else
  \hypersetup{%
    pdfborder = {0 0 0},
    breaklinks
  }%
\fi

% Setup fancyhdr package
\fancyhf{}
\fancyhfoffset{0em}

% Remove head rule
\renewcommand{\headrulewidth}{0pt}
%\fancyfoot[C]{\thepage}
\pagestyle{fancy}

%\pagestyle{empty}                         % non-numbered pages
%\font\fb=''[cmr10]''                      % for use with \LaTeX command

% Setup CV sections
\titleformat{\section}{\color{blue}\Large\raggedright}{}{0em}{}[\titlerule]
\titlespacing{\section}{0pt}{2pt}{2pt}

% Configure list
\setlist[itemize,1]{label=\color{blue}\faAngleRight, nosep, leftmargin=1em} 
\setlist[itemize,2]{label=\color{blue}\faAngleRight, nosep, leftmargin=1em} 



% Setup Array : new column type
\newcolumntype{R}[1]{>{\hfill}m{#1}}

%Italian hyphenation for the word: ''corporations''
\hyphenation{im-pre-se}

% Setup fonts
\defaultfontfeatures{Mapping=tex-text}
%

% Define font to use according to localFont option
\ifundef{\@local}
{
  %\setmainfont[BoldFont = Helvetica Neue, ItalicFont=Helvetica Neue Thin Italic ,SmallCapsFont = Helvetica Neue Light]{Helvetica Neue Thin}
  \setmainfont{Source Sans Pro Light}[
    BoldFont = SourceSansPro-Regular, 
    ItalicFont= Source Sans Pro Light Italic]
}
{
  \setmainfont{SourceSansPro-Light}[
    Path = fonts/, 
    BoldFont = SourceSansPro-Regular, 
    ItalicFont = SourceSansPro-LightIt]
}

%New length definition
\newlength{\rightcolumnlength}
\setlength{\rightcolumnlength}{14.8cm}

\newlength{\leftcolumn}
\setlength{\leftcolumn}{2.5cm}

% % Command for printing skill progress bars
% \newcommand\programming[1]{ 
% 	\renewcommand{\programming}{
% 		\begin{tikzpicture}
% 			\foreach [count=\i] \x/\y in {#1}{
% 				\draw[fill=maingray,maingray] (0,\i) rectangle (6,\i+0.4);
% 				\draw[fill=white,mainpurple](0,\i) rectangle (\y,\i+0.4);
% 				\node [above right] at (0,\i+0.35) {\x};
% 			}
% 		\end{tikzpicture}
% 	}
% }

% \newcommand\programminglanguage[1]{ 
% 	\renewcommand{\programminglanguage}{
% 		\begin{tikzpicture}
% 		\foreach [count=\i] \x/\y in {#1}{
% 			\draw[fill=maingray,maingray] (0,\i) rectangle (6,\i+0.4);
% 			\draw[fill=white,mainpurple](0,\i) rectangle (\y,\i+0.4);
% 			\node [above right] at (0,\i+0.35) {\x};
% 		}
% 		\end{tikzpicture}
% 	}
% }
\newcommand\link[2]{\color{linkcolor}\href{#1}{#2} }
\newcommand\important[1]{\textbf #1}
\newcommand\idphoto{
  \tikz\path[fill overzoom image={\@photo}]circle[radius=0.7\linewidth];
}
% Create a tag
% Usage: \cvtag{<tag label>}
\newcommand{\cvtag}[1]{%
  \tikz[baseline]\color{blue}\node[anchor=base,draw=darkGrey!70,rounded corners=0.5ex,inner xsep=1ex,inner ysep =0.55ex,text height=1.3ex,text depth=.25ex]{#1};
}
% Create a tag

% Font Awesome icons aliases
\newcommand{\mailSymbol}{\faAt}
\newcommand{\locationSymbol}{\faMapMarker}
\newcommand{\infoSymbol}{\faInfo}
\newcommand{\linkedinSymbol}{\faLinkedin}
\newcommand{\viadeoSymbol}{\faViadeo}
\newcommand{\mobileSymbol}{\faPhone}
\newcommand{\githubSymbol}{\faGithub}
\newcommand{\postmanSymbol}{\faDocker}

\newcommand\link[2]{\color{linkcolor}\href{#1}{#2}\color{Black} }
\newcommand\important[1]{\textbf #1}



% Render author's name
% Usage: \user{<firstanme>}{<lastname>}
\newcommand\user[2]{\color{black}{\LARGE #1 \textsc{\textbf{#2}}}\color{black}}

% Render a text with its symbol
% Usage; \socialtext{<icon>}{<label>}
\newcommand{\socialtext}[2]{\mbox{\textcolor{symbolcolor}{#1}\hspace{0.5em}#2\hspace{1em}}}

% Render a link with its symbol
% Usage; \sociallink{<icon>}{<label>}
\newcommand{\sociallink}[3]{\mbox{\textcolor{symbolcolor}{#1}\hspace{0.5em}\link{#2}{#3}\hspace{1em}}}

% Define author's name
% Usage: \name{<firstname>}{<lastname>}
% Usage: \firstname{<firstname>}
% Usage: \lastname{<lastname>}
% Usage: \familyname{<familyname>}
\newcommand*{\name}[2]{\def\@firstname{#1}\def\@lastname{#2}}
\newcommand*{\firstname}[1]{\def\@firstname{#1}}
\newcommand*{\lastname}[1]{\def\@lastname{#1}}
\newcommand*{\familyname}[1]{\def\@lastname{#1}}
\def\@familyname{\@lastname}

% Define author's tagline
% Usage: \tagline{<tag line>}
\newcommand*{\tagline}[1]{\def\@tagline{#1}}

% Define author's photo
% Usage \photo{<diameter>}{<photo>}
\newcommand{\photo}[2]{\def\@photo{#2}\def\@photodiameter{#1}}

% Render author's address
% Usage: \address{<address>}
\newcommand*{\address}[1]{\socialtext{\locationSymbol}{#1}}

% Render author's infos
% Usage: \infos{<infos>}
\newcommand*{\infos}[1]{\socialtext{\infoSymbol}{#1}}

% Render author's linked-in (optional)
% Usage: \linkedin{<linked-in-nick>}
\newcommand*{\linkedin}[1]{\sociallink{\linkedinSymbol}{https://www.linkedin.com/in/#1}{#1}}
% Render author's viadeo(optional)
% Usage: \viadeo{<viadeo-nick>}
\newcommand*{\viadeo}[1]{\sociallink{\viadeoSymbol}{http://www.viadeo.com/fr/profile/#1}{viadeo.com/fr/profile/#1}} 

% Render author's github (optional)
% Usage: \github{<github-nick>}
\newcommand*{\github}[1]{\sociallink{\githubSymbol}{https://www.github.com/#1}{GitHub}}           % Github icon + Ufbbli


\newcommand*{\postman}[1]{\sociallink{\postmanSymbol}{https://hub.docker.com/u/intigration}{DockerHub}}    

% Render author's email (optional)
% Usage: \email{<email adress>}
\newcommand*{\email}[1]{\sociallink{\mailSymbol}{mailto:#1}{#1}}

% Render a website link (optional)
% Usage: \email{<email adress>}
\newcommand*{\website}[1]{\sociallink{\faExternalLink}{#1}}

% Render author's mobile phone (optional)
% Usage: \smartphone{<mobile phone number>}
\newcommand*\smartphone[1]{\socialtext{\mobileSymbol}{#1}}    

% Render author's tagline
\newcommand\resumetitle[1]{
  \ifundef{\@alternative}{
  \par{
   \bigskip\center{\Large 
    \color{accentcolor}
    \small\textbf{#1}
     \color{Black}}
	 }
  }{
    \small\color{magenta}{#1}
  }
}

% \newcommand\idphoto{
%   \tikz\path[fill overzoom image={\@photo}]circle[radius=0.7\linewidth];
% }

% Define social entries to print in header
\newcommand{\socialinfo}[1]{\def\@socialinfo{#1}}

% Render CV headerfpro
% Needs \@firstname, \@lastname and \@tagline to be defined
\newcommand*{\makecvheader}{
  \ifundef{\@alternative}{
    \ifundef{\@photodiameter}{
      \begin{minipage}{\linewidth}
    }{
      \begin{minipage}{\dimexpr\linewidth-\@photodiameter-2em}
    }
    \color{black}\user{\@firstname}{\@lastname}\color{black}\\
    \small{\@socialinfo}
    \end{minipage}
    \ifdef{\@photodiameter}{
      \begin{minipage}{\@photodiameter}
        \idphoto
      \end{minipage}
    }{}
    \resumetitle{\@tagline}
  }{
    \ifundef{\@photodiameter}{
      \begin{minipage}{\linewidth}
    }{
      \begin{minipage}{\dimexpr\linewidth-\@photodiameter-2em}
    }
    \user{\@firstname}{\@lastname}\\
    \resumetitle{\@tagline}
    \smallskip\\
    \small{\@socialinfo}
    \end{minipage}
    \ifdef{\@photodiameter}{
      \begin{minipage}{\@photodiameter}
        \idphoto
      \end{minipage}
    }{}
\smallskip  }
}

% Define a footer for CV
% Usage: \makecvfooter{<left>}{<center>}{<right>}
\newcommand*{\makecvfooter}[3]{%
  \fancyfoot{}
  \fancyfoot[L]{#1}
  \fancyfoot[C]{#2}
  \fancyfoot[R]{#3}
}

% Resume part title definition
\newcommand\sectionTitle[2]{\section{\texorpdfstring{\color{accentcolor}#2\enspace \textsc{#1}}{#2}}}

% Define the 'keywords' environment
\newenvironment{keywords}{%
  \renewcommand{\arraystretch}{1.1}

  \begin{tabular}{>{}r>{}p{13cm}} 
}{%
  \end{tabular}
}

% Render a scholarshipentry in the scolarship environment
% Usage: \scholarshipentry{<date>}{<description>}
\newcommand\keywordsentry[2]{
  \textbf{#1} &   #2\\ 
}

% Define a new column type for the scholarship environment
\newcolumntype{Y}{>{\raggedleft}p{\leftcolumn}}

% Define the 'scholarship' environment
\newenvironment{scholarship}{%
  \begin{tabular}{Y p{\rightcolumnlength}}
}{%
  \end{tabular}
}

% Render a scholarshipentry in the scolarship environment
% Usage: \scholarshipentry{<date>}{<description>}
\newcommand\scholarshipentry[2]{
  #1    &  #2 \\
}

% Define the 'skills' environment
\newenvironment{skills}{%
  \begin{longtable}{R{\leftcolumn}p{\rightcolumnlength}}
}{%
  \end{longtable}
}
% Render QRCODE
% Usage: \qrcode

% \newcommand{\cvqrcode}[1] {
% 	\begin{center}
% 		\includegraphics[width={#1}\mpwidth]{qrcode}
% 	\end{center}
% }

% Render a skill in the skills environment
% Usage: \skill{<skill>}{<level>}
\newcommand\skill[2]{
  \textbf{#1}    & \foreach \x in {1,...,5}{{\color{accentcolor!80} \ifnumgreater{\x}{#2}{\faCircleThin}{\faCircle}}\enspace } \\
}

\newcolumntype{E}{>{\raggedright\arraybackslash}p{\rightcolumnlength}}

% Define the 'experiences' environment
\newenvironment{experiences}{%
  \begin{longtable}{R{\leftcolumn}|E}
}{%
  \end{longtable}
}

% Render an experience in the experiences environment
% Usage: 
% \experience
%  {<End date>}      {<Title>}{<Enterprise>}{<Country>}
%  {<Start date}     {
%                      <Experience description (Could be a list)>
%                    }
%                    {<Technology list>}
\newcommand\experience[7]{
{#1}  & \textbf{#2} \textbf{\foreach \n in {#7}{\cvtag{\n}}, {\textsc{#3}, #4}}   								\\*
  \textbf{#5}     & \begin{minipage}[t]{\rightcolumnlength}
  					         {#6}
                   \end{minipage}										\\*
                 & \footnotesize{\foreach \n in {#7}{\cvtag{\n}}} 	\\
  }
\newcommand\deliverables[5]{
  \textbf{#1}   								\\*
 \textbf{#2, #3}   & \begin{minipage}[t]{\rightcolumnlength}
  					         #4
                   \end{minipage}					
                 & \footnotesize{\foreach \n in {#5}{\cvtag{\n}}} 	\\
  }
% Render a consultant experience in the experiences environment
% Usage: 
% \consultantexperience
%  {<End date>}      {<Consultant title>}{<Consulting Enterprise>}{<Country>}
%  {<Start date}     {<Client title>}{<Client business unit>}
%                    {
%                      <Experience description (Could be a list)>
%                    }
%                    {<Technology list>}
\newcommand\consultantexperience[9]{
  \textbf{#1}    & \textbf{#2, \textsc{#3}, #4}   								\\*
  \textbf{#5}    & \emph{#6} pour \textsc{#7}                       				\\*
  				       & 	\begin{minipage}[t]{\rightcolumnlength}
  						        #8
                   	\end{minipage}										\\*
                 & \footnotesize{\foreach \n in {#9}{\cvtag{\n}}} 	\\
  }

\newcommand\emptySeparator{\multicolumn{2}{c}{}\\}

% Define the 'projects' environment
\newenvironment{projects}{%
  \begin{longtable}{l}
}{%
  \end{longtable}
}

% Define the 'project' entry in the 'projects' environment
% Usage:
% \project
%   {<Project name>}{<dates>}
%   {<link1> <link2>}
%   {<Project description>}
%   {<techno1>,<techno2>}
\newcommand\project[5]{
  \begin{minipage}[t]{\dimexpr(\linewidth) - 1.5em}
    \textbf{\textsc{#1}} \hfill \textsc{#2}\smallskip\\
    #3\\
    #4\smallskip\\
    \footnotesize{\foreach \n in {#5}{\cvtag{\n}}}\\
  \end{minipage}
  \\*
}



\newcommand*\twocolumnsection[2]{
  \begin{minipage}[t]{\dimexpr(\linewidth/2) - 3em}
    #1
  \end{minipage}
  \hfill
  \begin{minipage}[t]{\dimexpr(\linewidth/2) - 3em}
    #2
  \end{minipage}
  }

% Define the 'referencees' environment
\newenvironment{referees}{%
}{%
  \hfill
  \bigskip
}

\newcommand*\referee[5]{
  \hspace{1em}
  \begin{minipage}[t]{\dimexpr(\linewidth/3) - 3em}
    \begin{tabular}{>{}l >{}l}
      \multicolumn{2}{l}{\textbf{#1}}\\
      \multicolumn{2}{l}{\emph{#2}, \textsc{#3}}\\
      \quad \mailSymbol & \href{mailto:#4}{#4} \\  
      \quad \faPhone & #5 \\
    \end{tabular}
  \end{minipage}%
}
\newcommand\mllibs{ 
~
	\smartdiagram[bubble diagram]{
        \textbf{~~~~~~~Data~~~~~~~},
        \textbf{~~~~~PyTorch~~~~~},
        \textbf{~~~~XGBoost~~~~},

        \textbf{~~~~LightGBM~~~~},
		\textbf{~~~~~Scikit~~~~~~}\\\textbf{~~~Learn~~~},
		\textbf{~~~~MLFlow~~~~}
    }
}
\newcommand\usecases{ 
~
	\smartdiagram[bubble diagram]{
        \textbf{~~~~~~~Data~~~~~~~},
        \textbf{~~~~~PyTorch~~~~~},
        \textbf{~~~~XGBoost~~~~},

        \textbf{~~~~LightGBM~~~~},
		\textbf{~~~~~Scikit~~~~~~}\\\textbf{~~~Learn~~~},
		\textbf{~~~~MLFlow~~~~}
    }
}
\newcommand\pythonlibs{ 
~
	\smartdiagram[bubble diagram]{
        \textbf{~~~~~~Python~~~~~~},
        \textbf{~~~~~FastAPI~~~~~},
        \textbf{~~~~~PyTest~~~~~},
        \textbf{~~~~~Hydra~~~~},
        \textbf{~~~~~Requests~~~~},
        \textbf{~~~~~Django~~~~},
        \textbf{~CookieCutter~}
    }
}
% \begin{tabular*}{\textwidth}
%   \textbf{\Huge Jane Doe \vspace{2pt}} & % row = 1, col = 1
%   Location: Anycity, Anystate, Anycountry \\ % row = 1, col = 2
%   \href{https://jane-doe.com}{\uline{jane-doe.com}} $|$ % row = 2, col = 1
%   \href{https://linkedin.com/in/jane-doe}{\uline{LinkedIn}} $|$ % row = 2, col = 1
%   \href{https://github.com/jane-doe}{\uline{GitHub}} $|$ % row = 2, col = 1
%   \href{https://leetcode.com/jane-doe}{\uline{Leetcode}} & % row = 2, col = 1
%   Email: \href{mailto:jane.doe@anymail.com}{\uline{jane.doe@anymail.com}} $|$ % row = 2, col = 2
%   Mobile: 5555555555 \\ % row = 2, col = 2
% \end{tabular*}


\newcommand\hobies{ 
~
	\smartdiagram[bubble diagram]{
        \textbf{~~~~~~~~~PLM~~~~~~~~~},
        \textbf{~~~~Product~~~~}\\\textbf{~~~Management~~~},
        \textbf{~~~~Quality Process~~~~}\\\textbf{~~~Management~~~},
        \textbf{~~~~Project~~~~}\\\textbf{~~~Management~~~},
        \textbf{~~~~Team~~~~}\\\textbf{~~~Management~~~},
        \textbf{~~~~~~Operations~~~~~~}
    }
}




% Programming skill bars
\programming{{$\textbullet$ AWS $\textbullet$ Airflow $\textbullet$ Big Data / 2.0}, {$\textbullet$ Microsoft Office $\textbullet$ Docker  $\textbullet$ SQL/ 3.0}, {$\textbullet$ Linux $\textbullet$ Git / 4.0}, 
{$\textbullet$ Python / 6.0}}
\vspace{10mm}
\programminglanguage{{\textbf{DevOps CI/CD - \faJenkins \faPython \space
        \faLinux \faDocker \faGithub \fa\faGitlab \faConfluence \faJira \space } / 5 }, { English (C1 - Professional Work Ability) / 5}, { Urdu (C2 - Native Language) / 6}}
%% Cake diagram ;)


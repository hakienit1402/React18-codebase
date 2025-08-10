#!/bin/bash

# ANSI escape codes for colors and cursor control
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color
HIGHLIGHT='\033[7m' # Reverse video

# Arrow keys
UP=$'\e[A'
DOWN=$'\e[B'

# Function to display menu
display_menu() {
    local current=$1
    local options=("feat" "fix" "chore" "docs" "style" "refactor" "perf" "test" "build" "ci" "revert")
    echo -e "\033[2J\033[H" # Clear screen and move cursor to top
    echo "Choose branch type (use arrow keys and press Enter):"
    echo
    for i in "${!options[@]}"; do
        if [ $i -eq $current ]; then
            echo -e "${HIGHLIGHT}> ${options[$i]}${NC}"
        else
            echo "  ${options[$i]}"
        fi
    done
}

# Branch type selection with arrow keys
selected=0
options=("feat" "fix" "chore" "docs" "style" "refactor" "perf" "test" "build" "ci" "revert")
while true; do
    display_menu $selected
    read -s -n 3 key
    case "$key" in
        $UP)
            ((selected--))
            if [ $selected -lt 0 ]; then
                selected=$((${#options[@]}-1))
            fi
            ;;
        $DOWN)
            ((selected++))
            if [ $selected -ge ${#options[@]} ]; then
                selected=0
            fi
            ;;
        "") # Enter key
            type="${options[$selected]}"
            break
            ;;
    esac
done

echo
echo -e "${GREEN}Selected: $type${NC}"
echo

# Get ticket number
while true; do
    read -p "Enter ticket number (without PD-): " ticket_number
    if [ -z "$ticket_number" ]; then
        echo -e "${RED}Ticket number entry cancelled${NC}"
        exit 1
    elif [[ $ticket_number =~ ^[0-9]+$ ]]; then
        break
    else
        echo -e "${RED}Please enter a valid number${NC}"
    fi
done

# Get ticket name
read -p "Enter ticket name: " ticket_name
if [ -z "$ticket_name" ]; then
    echo -e "${RED}Ticket name entry cancelled${NC}"
    exit 1
fi

# Convert ticket name to lowercase and replace spaces with underscores
formatted_name=$(echo "$ticket_name" | tr '[:upper:]' '[:lower:]' | tr ' ' '_')

# Create branch name
branch_name="$type/PD-${ticket_number}_${formatted_name}"

# Show spinner while creating branch
echo -e "${BLUE}Creating branch...${NC}"
sleep 1

# Create and checkout the branch
if git checkout -b "$branch_name"; then
    echo -e "${GREEN}✓ Successfully created and checked out branch:${NC}"
    echo -e "${GREEN}$branch_name${NC}"
else
    echo -e "${RED}✗ Failed to create branch${NC}"
    exit 1
fi
